// OpenClaw Gateway WebSocket Client
// Direct connection to Contabo VPS Gateway

export interface AgentEvent {
  type: 'agent_created' | 'agent_started' | 'agent_stopped' | 'agent_error';
  agentId: string;
  timestamp: string;
}

export interface AgentStatus {
  id: string;
  status: 'idle' | 'busy' | 'error';
  lastActivity: string;
}

export interface GatewayStats {
  agents: number;
  activeAgents: number;
  totalTasks: number;
  systemHealth: number;
}

export interface OpenClawGatewayClient {
  connect(): Promise<void>;
  disconnect(): void;
  on(event: string, callback: (data: any) => void): void;
  getAgents(): AgentStatus[];
  getStats(): GatewayStats;
}

class GatewayClient implements OpenClawGatewayClient {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners = new Map<string, ((data: any) => void)[]>();

  constructor(url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws) {
        this.ws.close();
      }

      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('Connected to OpenClaw Gateway:', this.url);
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Gateway event:', data);

          const callbacks = this.listeners.get(data.type) || [];
          callbacks.forEach(cb => cb(data));
        } catch (err) {
          console.error('Error parsing gateway message:', err);
        }
      };

      this.ws.onerror = (error) => {
        console.error('Gateway error:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('Gateway disconnected');
      };
    });
  }

  disconnect() {
    this.ws?.close();
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  getAgents(): AgentStatus[] {
    // In a real implementation, this would pull from the socket
    return [];
  }

  getStats(): GatewayStats {
    return {
      agents: 0,
      activeAgents: 0,
      totalTasks: 0,
      systemHealth: 100,
    };
  }
}

let client: OpenClawGatewayClient | null = null;

export function getGatewayClient(url: string = 'ws://localhost:18789'): OpenClawGatewayClient {
  if (!client) {
    client = new GatewayClient(url);
  }
  return client;
}

export function connectGateway(url: string): Promise<void> {
  return getGatewayClient(url).connect();
}

export function disconnectGateway(): void {
  getGatewayClient().disconnect();
}