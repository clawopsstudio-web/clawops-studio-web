# DeerFlow + Arjun Research Integration

## Status
✅ DeerFlow 2.0 running at `http://127.0.0.1:2026`
✅ Model: GLM-4 Flash (OpenRouter, free tier)
✅ Security patch applied (commit 92c7a20)

## What DeerFlow Does for Arjun
- Deep multi-source research on prospects/companies
- Market intelligence reports from web data
- Competitive analysis synthesis
- Industry trend research

## How to Use

### Option 1: Direct Web UI
1. Open `http://127.0.0.1:2026/workspace`
2. Enter research query
3. Get comprehensive report

### Option 2: API Integration
```bash
# Submit research task
curl -X POST http://127.0.0.1:2026/api/research \
  -H "Content-Type: application/json" \
  -d '{"query": "Your research question here", "model_name": "glm-4-flash"}'
```

### Option 3: Trigger from Telegram
When Arjun lane receives a deep research request:
1. Henry/Arjun accesses DeerFlow at port 2026
2. Submits research query
3. Results posted back to Arjun topic

## DeerFlow Capabilities
- Web search and crawling
- Multi-step research workflows
- File operations and report generation
- Code execution for data analysis

## Notes
- DeerFlow runs locally (not exposed externally for security)
- Use OpenRouter free tier (GLM-4 Flash model)
- Sandbox provides secure execution environment
