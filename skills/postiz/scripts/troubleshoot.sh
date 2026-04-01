#!/bin/bash
#===============================================================================
# Postiz Troubleshooting Script
#===============================================================================
# Diagnose and fix common Postiz issues
#===============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

POSTIZ_PORT="${POSTIZ_PORT:-4007}"
TAILSCALE_FQDN="${TAILSCALE_FQDN:-}"

#-------------------------------------------------------------------------------
# Get Tailscale subdomain
#-------------------------------------------------------------------------------

get_tailscale_fqdn() {
    if [ -n "$TAILSCALE_FQDN" ]; then
        return 0
    fi
    
    TAILSCALE_FQDN=$(tailscale status --json 2>/dev/null | grep -oP '"DNSName":"[^"]+' | head -1 | cut -d'"' -f4 || true)
    
    if [ -z "$TAILSCALE_FQDN" ]; then
        read -p "Enter your Tailscale subdomain: " TAILSCALE_FQDN
    fi
}

#-------------------------------------------------------------------------------
# Check 1: Cookie Domain
#-------------------------------------------------------------------------------

check_cookie_domain() {
    echo ""
    echo "==============================================================================="
    echo "  Check 1: Cookie Domain (MOST COMMON ISSUE)"
    echo "==============================================================================="
    
    echo ""
    echo "Problem: Postiz sets cookies with Domain=.ts.net which browsers reject"
    echo "because .ts.net is a public suffix (like .com, .net)."
    echo ""
    
    # Test current cookie
    COOKIE=$(curl -s -D - "http://127.0.0.1:${POSTIZ_PORT}/api/auth/login" \
        -X POST -H "Content-Type: application/json" \
        -d '{"email":"test@test.com","password":"test","provider":"LOCAL"}' 2>/dev/null \
        | grep -i "set-cookie" | head -1)
    
    echo "Current cookie header:"
    echo "$COOKIE"
    echo ""
    
    if echo "$COOKIE" | grep -q "\.ts\.net" && ! echo "$COOKIE" | grep -q "${TAILSCALE_FQDN}"; then
        log_error "ISSUE FOUND: Cookie has .ts.net domain (public suffix)"
        log_info "Fix: nginx proxy_cookie_domain directive is missing or incorrect"
        return 1
    elif echo "$COOKIE" | grep -q "${TAILSCALE_FQDN}"; then
        log_success "Cookie domain looks correct: ${TAILSCALE_FQDN}"
        return 0
    else
        log_warning "Could not determine cookie domain"
        return 2
    fi
}

#-------------------------------------------------------------------------------
# Fix 1: Cookie Domain
#-------------------------------------------------------------------------------

fix_cookie_domain() {
    echo ""
    log_info "Applying cookie domain fix..."
    
    get_tailscale_fqdn
    
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
            proxy_cookie_domain .ts.net ${TAILSCALE_FQDN};
        }
    }
}
EOF
    
    nginx -t && nginx -s reload
    log_success "Cookie domain fix applied"
    log_info "Testing..."
    sleep 2
    check_cookie_domain
}

#-------------------------------------------------------------------------------
# Check 2: Containers
#-------------------------------------------------------------------------------

check_containers() {
    echo ""
    echo "==============================================================================="
    echo "  Check 2: Docker Containers"
    echo "==============================================================================="
    
    CONTAINERS=$(docker ps -a --filter "name=postiz" --format "{{.Names}}\t{{.Status}}")
    
    if [ -z "$CONTAINERS" ]; then
        log_error "No Postiz containers found"
        return 1
    fi
    
    echo "$CONTAINERS"
    echo ""
    
    if docker ps | grep -q postiz; then
        log_success "Postiz container is running"
    else
        log_error "Postiz container is NOT running"
        log_info "Try: docker start postiz"
        return 1
    fi
}

#-------------------------------------------------------------------------------
# Check 3: Nginx
#-------------------------------------------------------------------------------

check_nginx() {
    echo ""
    echo "==============================================================================="
    echo "  Check 3: Nginx Configuration"
    echo "==============================================================================="
    
    if ss -tlnp | grep -q 8081 || netstat -tlnp | grep -q 8081; then
        log_success "nginx is listening on port 8081"
    else
        log_error "nginx is NOT listening on port 8081"
        log_info "Check nginx configuration"
        return 1
    fi
    
    echo ""
    echo "nginx configuration:"
    grep -A5 "location /" /etc/nginx/nginx.conf | head -15
}

#-------------------------------------------------------------------------------
# Check 4: Tailscale Serve
#-------------------------------------------------------------------------------

check_tailscale() {
    echo ""
    echo "==============================================================================="
    echo "  Check 4: Tailscale Serve"
    echo "==============================================================================="
    
    if ! command -v tailscale &> /dev/null; then
        log_warning "Tailscale not installed"
        return 1
    fi
    
    if ! tailscale status &> /dev/null; then
        log_warning "Tailscale not logged in"
        return 1
    fi
    
    echo "Tailscale serve status:"
    tailscale serve status 2>/dev/null || log_warning "Tailscale serve not configured"
}

#-------------------------------------------------------------------------------
# Check 5: Postiz API
#-------------------------------------------------------------------------------

check_postiz_api() {
    echo ""
    echo "==============================================================================="
    echo "  Check 5: Postiz API Response"
    echo "==============================================================================="
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${POSTIZ_PORT}/auth/login")
    
    echo "HTTP status code: $HTTP_CODE"
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
        log_success "Postiz API is responding"
    else
        log_error "Postiz API is not responding correctly (code: $HTTP_CODE)"
        return 1
    fi
}

#-------------------------------------------------------------------------------
# Run All Checks
#-------------------------------------------------------------------------------

run_all_checks() {
    echo ""
    echo "==============================================================================="
    echo "  Postiz Diagnostic Report"
    echo "==============================================================================="
    
    check_cookie_domain
    check_containers
    check_nginx
    check_tailscale
    check_postiz_api
    
    echo ""
    echo "==============================================================================="
    echo "  Diagnostic Complete"
    echo "==============================================================================="
    echo ""
    echo "If login still doesn't work after all checks pass:"
    echo "  1. Clear browser cookies for your Tailscale domain"
    echo "  2. Try in a private/incognito window"
    echo "  3. Check browser console for JavaScript errors"
}

#-------------------------------------------------------------------------------
# Auto-fix
#-------------------------------------------------------------------------------

auto_fix() {
    echo ""
    echo "==============================================================================="
    echo "  Running Auto-Fix"
    echo "==============================================================================="
    
    fix_cookie_domain
    
    echo ""
    echo "Restarting Postiz..."
    docker restart postiz 2>/dev/null || true
    sleep 5
    
    echo ""
    log_info "Please clear your browser cookies and try logging in again."
}

#-------------------------------------------------------------------------------
# Help
#-------------------------------------------------------------------------------

show_help() {
    echo "Postiz Troubleshooting Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  check        Run all diagnostic checks"
    echo "  fix-cookie   Fix cookie domain issue (most common)"
    echo "  auto-fix     Run automatic fix"
    echo "  help         Show this help"
    echo ""
    echo "Environment variables:"
    echo "  POSTIZ_PORT        Postiz port (default: 4007)"
    echo "  TAILSCALE_FQDN     Tailscale subdomain"
}

#-------------------------------------------------------------------------------
# Main
#-------------------------------------------------------------------------------

case "${1:-check}" in
    check)
        run_all_checks
        ;;
    fix-cookie)
        fix_cookie_domain
        ;;
    auto-fix)
        auto_fix
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        show_help
        exit 1
        ;;
esac
