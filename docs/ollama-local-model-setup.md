# Local Model Setup: Ollama + Gemma 4 2B

Run Gemma 4 2B entirely on your VPS — zero API cost, full privacy.

## What This Gives You

- **Zero per-token billing** — inference runs on your own hardware
- **Full data privacy** — prompts never leave your server
- **Fast for simple tasks** — great for classification, tagging, short summaries
- **~2GB RAM** usage with Gemma 4 2B

## Prerequisites

- Contabo VPS with at least 4GB RAM (Pro or Agency plan)
- Ubuntu 22.04 LTS or similar Linux distribution
- SSH access to your VPS
- OpenClaw Gateway installed

## Installation

### 1. Install Ollama

SSH into your VPS:

```bash
ssh root@your-vps-ip
```

Install Ollama:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Verify installation:

```bash
ollama --version
```

### 2. Download Gemma 4 2B

Pull the model (this downloads ~1.6GB):

```bash
ollama pull gemma3:2b
```

List available models:

```bash
ollama list
```

### 3. Start the Ollama Server

Start Ollama as a background service:

```bash
ollama serve
```

Verify it's running:

```bash
curl http://localhost:11434/api/tags
```

You should see:
```json
{
  "models": [
    {
      "name": "gemma3:2b",
      "size": 1611225643,
      "modified_at": "2026-04-08T..."
    }
  ]
}
```

### 4. Configure as Systemd Service (Recommended)

Create the service file:

```bash
sudo nano /etc/systemd/system/ollama.service
```

Paste:

```ini
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/ollama serve
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable ollama
sudo systemctl start ollama
sudo systemctl status ollama
```

### 5. Configure OpenClaw to Use Ollama

Edit your OpenClaw gateway config:

```bash
nano ~/.openclaw/config.json
```

Add or update the models section:

```json
{
  "models": {
    "local": {
      "provider": "ollama",
      "base_url": "http://localhost:11434",
      "model": "gemma3:2b"
    }
  }
}
```

Or via environment variable:

```bash
export OLLAMA_BASE_URL=http://localhost:11434
export OLLAMA_MODEL=gemma3:2b
```

### 6. Restart OpenClaw Gateway

```bash
openclaw gateway restart
```

### 7. Test the Setup

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3:2b",
  "prompt": "What is 2+2?",
  "stream": false
}'
```

## Performance Notes

| Model | RAM | Speed | Best For |
|-------|-----|-------|----------|
| Gemma 4 2B | ~2GB | Fast | Classification, tagging, short tasks |
| Gemma 4 7B | ~6GB | Medium | Summaries, Q&A, light reasoning |
| Llama 3 8B | ~8GB | Medium | General purpose tasks |

## Troubleshooting

### "connection refused" on port 11434
```bash
# Check if Ollama is running
ps aux | grep ollama

# Check logs
journalctl -u ollama -f
```

### Model loads but responses are slow
```bash
# Check RAM availability
free -h

# Check CPU
top
```

### Out of memory errors
- Use a smaller model (gemma3:2b instead of larger variants)
- Add swap space:
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## Cost Comparison

| Task Type | API Model (GPT-4) | Gemma 4 2B (Ollama) |
|-----------|-------------------|----------------------|
| 100 short tasks | ~$0.50 | $0.00 |
| 1,000 tasks | ~$5.00 | $0.00 |
| 10,000 tasks | ~$50.00 | $0.00 |

**Break-even:** After ~2,000 simple tasks, Ollama pays for the VPS upgrade itself.

## Auto-Start on Boot

With the systemd service configured (step 4), Ollama will automatically start on VPS reboot.
