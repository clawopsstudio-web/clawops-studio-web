# TOOLS

## Core Tools
- read — file contents (text + images)
- write — create/overwrite files
- edit — surgical edits (exact text match required)
- exec — shell commands (pty for terminal UIs)

## Installed Services (target state)
- OpenClaw Gateway: port 18789 (loopback / tailscale only)
- n8n: port 5678 (tailscale only)
- PinchTab: port 9867 (loopback)
- Neko: port 8080 (tailscale only)
- Firecrawl: port 3002 (internal Docker)
- Paperclip: port 4000 (tailscale only)

## Key APIs
- OpenAI Codex OAuth — chat/coding access
- OpenAI API key — available for direct TTS/Whisper-style API usage
- Gemini (API key — used for embeddings + web search)
- OpenRouter (fallback models)
- Telegram Bot API
- GitHub (PAT — pending)

## Audio
- Local TTS script: `scripts/openai-tts.sh`
- Default TTS model: `gpt-4o-mini-tts`
- Default voice: `onyx`
- Preferred style: deep, confident, direct
- Verified local audio generation to Ogg Opus

## Browser Automation
- Chrome VNC: https://vmi3094584-1.tailec7a72.ts.net/chrome/ (port 5800, Docker)
- Neko stream: https://vmi3094584-1.tailec7a72.ts.net/chrome/ (watch mode via VNC)
- PinchTab: DEPRECATED — no longer in use
