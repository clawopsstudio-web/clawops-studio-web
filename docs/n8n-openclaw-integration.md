# n8n + OpenClaw Integration Guide

## Overview

OpenClaw can integrate with n8n workflows to create a powerful automation ecosystem. OpenClaw handles complex reasoning, while n8n handles repetitive high-volume tasks.

### Key Benefits

- **Token Savings**: n8n performs simple, repetitive actions (parse JSON, validate data, basic logic)
- **Cost Savings**: Reduce OpenClaw API usage by offloading simple tasks
- **Reliability**: n8n is battle-tested for workflow orchestration
- **Integration**: n8n connects to 300+ apps (Stripe, Slack, Gmail, etc.)

---

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Webhook   │ ───→ │     n8n      │ ───→ │   OpenClaw   │
│   (Shopify, │      │ (Workflows)  │      │   (AI Agent) │
│   Stripe,   │      │              │      │   to Reason) │
│   etc.)     │      └──────────────┘      └──────────────┘
└─────────────┘

Alternative Flow:
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   User      │ ───→ │   OpenClaw   │ ───→ │   n8n       │
│   Request   │      │   (AI Agent) │      │   (Automation)│
└─────────────┘      └──────────────┘      └──────────────┘
```

---

## Integration Methods

### 1. HTTP Webhook Trigger (Recommended)

OpenClaw can be triggered via HTTP POST from n8n.

#### OpenClaw Setup

1. Get your OpenClaw instance URL:
   ```bash
   # Your VPS IP
   https://YOUR_VPS_IP:18789
   ```

2. Configure webhook endpoint in OpenClaw:
   ```bash
   openclaw gateway configure channels webhook \
     --url https://YOUR_VPS_IP:18789/webhook/agent \
     --name "n8n Integration"
   ```

3. Create a webhook authentication token (optional):
   ```bash
   openclaw gateway configure channels webhook \
     --token YOUR_SECRET_TOKEN \
     --name "n8n Integration"
   ```

#### n8n Webhook Node Configuration

1. Add a **Webhook** node to your n8n workflow
2. Configure:
   ```
   Method: POST
   Path: /openclaw-trigger
   Authentication: None (or Header Auth if you used token)
   ```

3. Link the webhook to an **IF** node for validation (optional):
   ```json
   {
     "conditions": {
       "string": [
         {
           "value1": "={{$json.path}}",
           "operation": "equals",
           "value2": "/openclaw-trigger"
         }
       ]
     }
   }
   ```

#### n8n → OpenClaw Payload

```json
{
  "agentId": "agent_123",
  "task": "Analyze lead data",
  "context": {
    "leadName": "John Doe",
    "company": "Acme Inc",
    "leadValue": "$5000"
  }
}
```

#### OpenClaw Response (from Webhook)

```json
{
  "success": true,
  "agentId": "agent_123",
  "taskId": "task_456",
  "message": "Task received",
  "estimatedResponseTime": "2-5 seconds"
}
```

---

### 2. MCP Server (Advanced)

Use MCP to connect n8n's nodes directly to OpenClaw's capabilities.

#### Create MCP Server for OpenClaw

```typescript
// openclaw-mcp.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "openclaw-server",
  version: "1.0.0",
});

server.tool(
  "openclaw-analyze",
  "Send a task to OpenClaw for analysis",
  {
    agentId: z.string().describe("The agent ID to process this task"),
    task: z.string().describe("The task description"),
    context: z.any().optional().describe("Additional context data")
  },
  async ({ agentId, task, context }) => {
    // Call OpenClaw API
    const response = await fetch(`https://YOUR_VPS_IP:18789/api/v1/agent/${agentId}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, context })
    });

    const data = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

#### Run MCP Server

```bash
npx tsx openclaw-mcp.ts
```

#### n8n Configuration

1. Add **Execute Command** node
2. Configure:
   ```
   Command: npx
   Arguments: tsx openclaw-mcp.ts
   ```

---

### 3. Direct HTTP Request

Send tasks directly to OpenClaw from n8n API nodes.

#### n8n Configuration

1. Add **HTTP Request** node
2. Configure:
   ```
   Method: POST
   URL: https://YOUR_VPS_IP:18789/api/v1/task
   Authentication: Header Auth
   Header Name: Authorization
   Header Value: Bearer YOUR_OPENCLAW_TOKEN
   ```

3. Body (JSON):
   ```json
   {
     "agentId": "agent_123",
     "task": "Analyze customer feedback",
     "context": {
       "feedback": "Very happy with the product!",
       "category": "positive"
     }
   }
   ```

---

## Example Workflows

### Workflow 1: Lead Response Automation

```
1. New Lead Form (Webhook)
   ↓
2. Validate Data (IF Node)
   ↓
3. Send to OpenClaw (HTTP Request)
   ↓
4. OpenClaw Generates Response
   ↓
5. Send Email (Gmail)
   ↓
6. Log to Database (Supabase)
```

#### n8n Workflow Nodes

**Step 1: Webhook**
```json
{
  "path": "/new-lead",
  "responseMode": "onReceived"
}
```

**Step 2: OpenClaw HTTP Request**
```json
{
  "url": "https://YOUR_VPS_IP:18789/api/v1/agent/lead-analyzer",
  "method": "POST",
  "bodyParametersJson": "={{$json}}"
}
```

**Step 3: IF Node**
```json
{
  "conditions": {
    "string": [
      {
        "value1": "={{$json.success}}",
        "operation": "equals",
        "value2": "true"
      }
    ]
  }
}
```

**Step 4: Gmail**
```json
{
  "to": "={{$json.email}}",
  "subject": "Welcome to Acme!",
  "text": "={{$json.message}}"
}
```

---

### Workflow 2: Content Marketing Loop

```
1. Schedule Content Ideas (n8n)
   ↓
2. Send to OpenClaw (AI Analysis)
   ↓
3. OpenClaw Generates Posts
   ↓
4. Validate Quality (IF Node)
   ↓
5. Schedule to Social Media (HootSuite)
```

---

## Best Practices

### 1. Error Handling

Always add error handling in n8n workflows:

```json
{
  "conditions": {
    "json": [
      {
        "value1": "={{$json.error}}",
        "operation": "isNotEmpty"
      }
    ]
  }
}
```

### 2. Rate Limiting

Don't overwhelm OpenClaw:

```javascript
// Wait before sending next request
await $execution.wait(2000); // 2 seconds
```

### 3. Logging

Log all n8n → OpenClaw interactions:

```json
// Log to Google Sheets
{
  "spreadsheetId": "your-spreadsheet-id",
  "sheetName": "Log",
  "values": [
    "={{$now.toISOString()}}",
    "={{$json.taskId}}",
    "={{$json.status}}"
  ]
}
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| CORS Error | Use ngrok or reverse proxy |
| 502 Bad Gateway | Check OpenClaw Gateway status |
| Timeout | Increase n8n timeout or reduce task complexity |
| Invalid Agent | Verify agentId exists in OpenClaw |

### Check Status

```bash
# Check OpenClaw Gateway
curl https://YOUR_VPS_IP:18789/health

# Check n8n logs
docker logs n8n
```

---

## Next Steps

1. ✅ Set up OpenClaw webhook endpoint
2. ✅ Create n8n workflow with HTTP Request node
3. ✅ Test with sample payload
4. ✅ Add error handling and logging
5. ✅ Monitor performance and optimize

---

**Need help?** Contact support at help@clawops.studio