#!/bin/bash
#===============================================================================
# Postiz Installer with Tailscale + Cookie Domain Fix
#===============================================================================
# This script installs Postiz with proper nginx + Tailscale configuration.
# The critical fix: nginx rewrites cookie domain from .ts.net to full subdomain
# because browsers reject cookies for public suffixes like .ts.net
#
# Usage:
#   bash install-postiz.sh                    # Interactive mode
#   TAILSCALE_FQDN="myhost.ts.net" bash install-postiz.sh  # Non-interactive
#===============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
POSTIZ_PORT="${POSTIZ_PORT:-4007}"
POSTIZ_DIR="${POSTIZ_DIR:-/root/postiz}"
TAILSCALE_FQDN="${TAILSCALE_FQDN:-}"

#-------------------------------------------------------------------------------
# Helper functions
#-------------------------------------------------------------------------------

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_command() {
    if ! command -v "$1" &> /dev/null; then
        log_error "$1 is required but not installed."
        exit 1
    fi
}

#-------------------------------------------------------------------------------
# Prerequisites check
#-------------------------------------------------------------------------------

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    check_command docker
    check_command curl
    
    # Check Docker is running
    if ! docker info &> /dev/null; then
        log_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    
    # Check Tailscale
    if command -v tailscale &> /dev/null; then
        log_info "Tailscale found"
    else
        log_warning "Tailscale not found. Will set up nginx but skip Tailscale serve."
    fi
    
    log_success "Prerequisites OK"
}

#-------------------------------------------------------------------------------
# Get Tailscale subdomain
#-------------------------------------------------------------------------------

get_tailscale_subdomain() {
    if [ -n "$TAILSCALE_FQDN" ]; then
        log_info "Using provided subdomain: $TAILSCALE_FQDN"
        return 0
    fi
    
    if command -v tailscale &> /dev/null && tailscale status &> /dev/null; then
        # Try to get the Tailscale hostname
        TAILSCALE_FQDN=$(tailscale status --json 2>/dev/null | grep -oP '"DNSName":"[^"]+' | head -1 | cut -d'"' -f4 || true)
        
        if [ -z "$TAILSCALE_FQDN" ]; then
            TAILSCALE_FQDN=$(hostname).ts.net
        fi
        
        log_info "Detected Tailscale subdomain: $TAILSCALE_FQDN"
    else
        log_warning "Could not detect Tailscale subdomain."
        read -p "Enter your Tailscale subdomain (e.g., vmi3094584-1.tailec7a72.ts.net): " TAILSCALE_FQDN
    fi
    
    if [ -z "$TAILSCALE_FQDN" ]; then
        log_error "Tailscale subdomain is required for HTTPS access."
        exit 1
    fi
}

#-------------------------------------------------------------------------------
# Create Docker Compose file
#-------------------------------------------------------------------------------

create_docker_compose() {
    log_info "Creating Docker Compose configuration..."
    
    mkdir -p "$POSTIZ_DIR"
    
    cat > "$POSTIZ_DIR/docker-compose.yaml" << 'EOF'
services:
  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: unless-stopped
    ports:
      - "${POSTIZ_PORT:-4007}:5000"
    environment:
      - DATABASE_URL=postgresql://postiz-user:postiz-password@postiz-postgres:5432/postiz-db-local
      - REDIS_URL=redis://postiz-redis:6379
      - FRONTEND_URL=https://__TAILSCALE_FQDN__
      - MAIN_URL=https://__TAILSCALE_FQDN__
      - NEXT_PUBLIC_BACKEND_URL=https://__TAILSCALE_FQDN__/api
      - STORAGE_PROVIDER=local
      - IS_GENERAL=true
    depends_on:
      - postiz-postgres
      - postiz-redis
    networks:
      - postiz-network

  postiz-postgres:
    image: postgres:17-alpine
    container_name: postiz-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_USER=postiz-user
      - POSTGRES_PASSWORD=postiz-password
      - POSTGRES_DB=postiz-db-local
    volumes:
      - postiz-postgres-data:/var/lib/postgresql/data
    networks:
      - postiz-network

  postiz-redis:
    image: redis:7.2
    container_name: postiz-redis
    restart: unless-stopped
    networks:
      - postiz-network

volumes:
  postiz-postgres-data:

networks:
  postiz-network:
    driver: bridge
EOF

    # Replace placeholder with actual subdomain
    sed -i "s/__TAILSCALE_FQDN__/${TAILSCALE_FQDN}/g" "$POSTIZ_DIR/docker-compose.yaml"
    
    log_success "Docker Compose file created"
}

#-------------------------------------------------------------------------------
# Configure nginx with cookie domain fix
#-------------------------------------------------------------------------------

configure_nginx() {
    log_info "Configuring nginx with cookie domain fix..."
    
    # Create nginx configuration with the CRITICAL cookie domain fix
    cat > /etc/nginx/nginx.conf << EOF
worker_processes auto;
error_log /var/log/nginx/error.log;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 8081;
        server_name _;
        
        client_max_body_size 2G;
        
        location / {
            proxy_pass http://127.0.0.1:${POSTIZ_PORT}/;
            proxy_http_version 1.1;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            
            # CRITICAL FIX: Rewrite cookie domain from .ts.net to full subdomain
            # Without this, browsers reject cookies because .ts.net is a public suffix
            proxy_cookie_domain .ts.net ${TAILSCALE_FQDN};
        }
    }
}
EOF
    
    # Test and reload nginx
    if nginx -t 2>&1 | grep -q "syntax is ok"; then
        nginx -s reload 2>/dev/null || nginx
        log_success "nginx configured with cookie domain fix"
    else
        log_error "nginx configuration test failed"
        nginx -t
        exit 1
    fi
}

#-------------------------------------------------------------------------------
# Start Postiz
#-------------------------------------------------------------------------------

start_postiz() {
    log_info "Starting Postiz containers..."
    
    cd "$POSTIZ_DIR"
    
    # Pull latest image
    docker compose pull
    
    # Start containers
    docker compose up -d
    
    # Wait for Postiz to be ready
    log_info "Waiting for Postiz to start..."
    sleep 10
    
    # Check if running
    if docker ps | grep -q postiz; then
        log_success "Postiz is running"
    else
        log_error "Postiz failed to start. Check logs with: docker logs postiz"
        docker logs postiz
        exit 1
    fi
}

#-------------------------------------------------------------------------------
# Configure Tailscale serve
#-------------------------------------------------------------------------------

configure_tailscale() {
    if ! command -v tailscale &> /dev/null; then
        log_warning "Tailscale not available, skipping HTTPS setup"
        return
    fi
    
    if ! tailscale status &> /dev/null; then
        log_warning "Tailscale not logged in, skipping HTTPS setup"
        return
    fi
    
    log_info "Configuring Tailscale HTTPS serve..."
    
    # Reset any existing serve config
    tailscale serve reset 2>/dev/null || true
    
    # Set up Tailscale serve
    if tailscale serve --bg http://127.0.0.1:8081; then
        log_success "Tailscale HTTPS serve configured"
        log_info "Postiz should be accessible at: https://${TAILSCALE_FQDN}/"
    else
        log_warning "Failed to configure Tailscale serve"
    fi
}

#-------------------------------------------------------------------------------
# Verify installation
#-------------------------------------------------------------------------------

verify_installation() {
    log_info "Verifying installation..."
    
    # Check nginx
    if ss -tlnp | grep -q 8081 || netstat -tlnp | grep -q 8081; then
        log_success "nginx is listening on port 8081"
    else
        log_warning "nginx may not be listening on port 8081"
    fi
    
    # Check Postiz
    if curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${POSTIZ_PORT}/auth/login" | grep -qE "200|307|302"; then
        log_success "Postiz is responding"
    else
        log_warning "Postiz may not be responding correctly"
    fi
    
    # Check cookie domain fix
    COOKIE_TEST=$(curl -s -D - "http://127.0.0.1:${POSTIZ_PORT}/api/auth/login" \
        -X POST -H "Content-Type: application/json" \
        -d '{"email":"test@test.com","password":"test","provider":"LOCAL"}' 2>/dev/null \
        | grep -i "set-cookie" | head -1)
    
    if echo "$COOKIE_TEST" | grep -q "${TAILSCALE_FQDN}"; then
        log_success "Cookie domain fix is working"
    elif echo "$COOKIE_TEST" | grep -q ".ts.net"; then
        log_warning "Cookie still has .ts.net domain - this may cause login issues"
        log_info "Check nginx proxy_cookie_domain directive"
    else
        log_info "Cookie test: $COOKIE_TEST"
    fi
}

#-------------------------------------------------------------------------------
# Print summary
#-------------------------------------------------------------------------------

print_summary() {
    echo ""
    echo "==============================================================================="
    echo -e "${GREEN}Postiz Installation Complete!${NC}"
    echo "==============================================================================="
    echo ""
    echo "Access URLs:"
    echo "  Local:     http://localhost:${POSTIZ_PORT}/auth/login"
    echo "  HTTPS:     https://${TAILSCALE_FQDN}/auth/login"
    echo ""
    echo "First-time setup:"
    echo "  1. Go to https://${TAILSCALE_FQDN}/auth/register"
    echo "  2. Create your admin account"
    echo "  3. Start connecting social media accounts!"
    echo ""
    echo "Useful commands:"
    echo "  docker logs postiz          # View logs"
    echo "  docker restart postiz        # Restart"
    echo "  cd $POSTIZ_DIR && docker compose down  # Stop"
    echo ""
    echo "Troubleshooting:"
    echo "  If login doesn't work, check cookie domain fix:"
    echo "  grep proxy_cookie_domain /etc/nginx/nginx.conf"
    echo ""
    echo "==============================================================================="
}

#-------------------------------------------------------------------------------
# Main
#-------------------------------------------------------------------------------

main() {
    echo ""
    echo "==============================================================================="
    echo "  Postiz Installer with Tailscale + Cookie Domain Fix"
    echo "==============================================================================="
    echo ""
    
    check_prerequisites
    get_tailscale_subdomain
    create_docker_compose
    configure_nginx
    start_postiz
    configure_tailscale
    verify_installation
    print_summary
}

main "$@"
