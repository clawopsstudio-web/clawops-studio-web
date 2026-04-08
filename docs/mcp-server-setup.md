# MCP Server Setup Guide for OpenClaw

## What is MCP?

**Model Context Protocol (MCP)** is a standard way to connect AI agents to external tools, data sources, and APIs. MCP servers provide agents with structured access to your business systems.

### Why Use MCP?

- **Standardized**: Open-standard protocol across AI tools
- **Safe**: All requests go through the MCP server
- **Typed**: Clear parameter definitions prevent errors
- **Discoverable**: Agents automatically see available tools

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- TypeScript configured
- OpenClaw instance running

### Step 1: Install MCP SDK

```bash
npm install @modelcontextprotocol/sdk zod
```

### Step 2: Create MCP Server

Create a new file: `openclaw-mcp-server.ts`

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP server
const server = new McpServer({
  name: "openclaw-connector",
  version: "1.0.0",
});

// Tool: Analyze data with OpenClaw
server.tool(
  "analyze-with-openclaw",
  "Send task to OpenClaw AI agent for intelligent analysis",
  {
    agentId: z.string().describe("ID of the OpenClaw agent to use"),
    task: z.string().describe("The task or question to analyze"),
    context: z.any().optional().describe("Additional context data (JSON)")
  },
  async ({ agentId, task, context }) => {
    // Call OpenClaw API
    const response = await fetch(`https://YOUR_VPS_IP:18789/api/v1/agent/${agentId}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN"
      },
      body: JSON.stringify({
        agentId,
        task,
        context: context || {}
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        content: [{
          type: "text",
          text: `Error calling OpenClaw: ${error.message || response.statusText}`
        }],
        isError: true
      };
    }

    const data = await response.json();

    return {
      content: [{
        type: "text",
        text: JSON.stringify(data, null, 2)
      }]
    };
  }
);

// Tool: Get agent status
server.tool(
  "get-agent-status",
  "Check if an OpenClaw agent is running and healthy",
  {
    agentId: z.string().describe("ID of the agent to check")
  },
  async ({ agentId }) => {
    const response = await fetch(`https://YOUR_VPS_IP:18789/api/v1/agent/${agentId}/status`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    });

    const data = await response.json();

    return {
      content: [{
        type: "text",
        text: JSON.stringify(data, null, 2)
      }]
    };
  }
);

// Connect to stdin/stdout
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("OpenClaw MCP Server running");
```

### Step 3: Add to package.json

```json
{
  "scripts": {
    "start": "tsx openclaw-mcp-server.ts"
  }
}
```

### Step 4: Run MCP Server

```bash
npm run start
```

The server runs as a standalone process that reads/writes to stdin/stdout.

---

## MCP Tools Reference

### Tool 1: analyze-with-openclaw

Sends a task to OpenClaw for intelligent analysis.

**Parameters:**
```typescript
{
  agentId: string,      // Required: Agent ID to use
  task: string,         // Required: Task description
  context?: any,        // Optional: Additional context
}
```

**Example Call:**
```typescript
{
  agentId: "lead-analyzer",
  task: "Analyze this lead's qualification score",
  context: {
    name: "John Doe",
    company: "Acme Inc",
    visitCount: 3,
    dealSize: 5000
  }
}
```

---

### Tool 2: get-agent-status

Checks if an OpenClaw agent is running and healthy.

**Parameters:**
```typescript
{
  agentId: string,      // Required: Agent ID to check
}
```

**Example Response:**
```json
{
  "agentId": "lead-analyzer",
  "status": "running",
  "uptime": "2h 34m",
  "tasksCompleted": 156
}
```

---

## Advanced MCP Servers

### Database MCP Server

Connect OpenClaw to your database:

```typescript
server.tool(
  "query-database",
  "Execute a database query",
  {
    query: z.string().describe("SQL query"),
    params: z.any().optional().describe("Query parameters")
  },
  async ({ query, params }) => {
    // Call your DB
    const results = await db.query(query, params);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(results, null, 2)
      }]
    };
  }
);
```

### File System MCP Server

Read and write files:

```typescript
server.tool(
  "read-file",
  "Read a file from disk",
  {
    path: z.string().describe("File path"),
    encoding: z.enum(["utf8", "base64"]).optional().describe("File encoding")
  },
  async ({ path, encoding = "utf8" }) => {
    const content = await fs.readFile(path, encoding === "base64" ? "base64" : "utf8");
    return {
      content: [{
        type: "text",
        text: encoding === "base64" ? content : content
      }]
    };
  }
);
```

### API MCP Server

Integrate external APIs:

```typescript
server.tool(
  "call-api",
  "Call an external REST API",
  {
    url: z.string().url().describe("API endpoint URL"),
    method: z.enum(["GET", "POST", "PUT", "DELETE"]).default("GET").describe("HTTP method"),
    headers: z.record(z.string()).optional().describe("Request headers"),
    body: z.any().optional().describe("Request body")
  },
  async ({ url, method = "GET", headers, body }) => {
    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return {
      content: [{
        type: "text",
        text: JSON.stringify(data, null, 2)
      }]
    };
  }
);
```

---

## n8n Integration

### Running MCP Server in n8n

1. Add **Execute Command** node to n8n workflow
2. Configure:
   ```
   Command: npx
   Arguments: tsx /path/to/openclaw-mcp-server.ts
   Working Directory: /path/to/project
   ```

3. Use MCP tools in subsequent nodes:
   ```
   ${MCP.openclaw-connector.analyze-with-openclaw}
   ```

### MCP Server Configuration File

Create `.mcp.json`:

```json
{
  "mcpServers": {
    "openclaw-connector": {
      "command": "npx",
      "args": ["tsx", "/path/to/openclaw-mcp-server.ts"],
      "env": {
        "OPENCLAW_URL": "https://YOUR_VPS_IP:18789",
        "OPENCLAW_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

---

## Testing MCP Server

### Test with OpenClaw

```bash
# Run MCP server in one terminal
npm run start

# Call it from another terminal
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | nc localhost 4566
```

### Test in n8n

1. Add **HTTP Request** node to n8n
2. Call MCP server directly (for testing):
   ```
   Method: POST
   URL: https://YOUR_VPS_IP:4566
   Body:
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "tools/call",
     "params": {
       "name": "analyze-with-openclaw",
       "arguments": {
         "agentId": "lead-analyzer",
         "task": "Analyze this customer"
       }
     }
   }
   ```

---

## Security Considerations

### 1. API Keys

Never hardcode API keys. Use environment variables:

```typescript
const OPENCLAW_TOKEN = process.env.OPENCLAW_TOKEN;
const OPENCLAW_URL = process.env.OPENCLAW_URL;

if (!OPENCLAW_TOKEN || !OPENCLAW_URL) {
  throw new Error("OPENCLAW_TOKEN and OPENCLAW_URL must be set");
}
```

### 2. Input Validation

Always validate inputs:

```typescript
server.tool(
  "safe-query",
  "Safe database query",
  {
    query: z.string().min(1).max(1000)
  },
  async ({ query }) => {
    // Prevent SQL injection
    const safeQuery = query.replace(/;|DROP|DELETE|INSERT/i, "");
    // ... execute query
  }
);
```

### 3. Error Handling

Return structured errors:

```typescript
if (error) {
  return {
    content: [{
      type: "text",
      text: `Error: ${error.message}`
    }],
    isError: true
  };
}
```

---

## Deployment

### Production Setup

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["node", "dist/openclaw-mcp-server.js"]
```

### Using PM2

```bash
npm install -g pm2
pm2 start openclaw-mcp-server.ts --name openclaw-mcp
pm2 save
pm2 startup
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Server not starting | Check Node.js version, run `npm install` |
| Tools not found | Verify MCP server is running |
| Timeout | Increase server timeout, reduce task complexity |
| CORS errors | Use reverse proxy (ngrok, Caddy) |

---

## Next Steps

1. ✅ Install MCP SDK
2. ✅ Create MCP server file
3. ✅ Test with sample tools
4. ✅ Integrate with n8n
5. ✅ Deploy to production

---

**Need help?** Check the [n8n Integration Guide](n8n-openclaw-integration.md) for alternative methods.