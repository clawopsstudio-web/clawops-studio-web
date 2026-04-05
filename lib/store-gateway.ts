// Real-time OpenClaw Gateway Store
// Connects directly to Contabo VPS Gateway

import { create } from 'zustand';
import { connectGateway, getGatewayClient, type AgentStatus, type GatewayStats } from './openclaw-gateway-client';

interface RealDashboardStats {
  stats: GatewayStats;
  agents: AgentStatus[];
  lastUpdate: Date;
}

interface DashboardStatsStore extends RealDashboardStats {
  refresh: () => Promise<void>;
  connect: (url: string) => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

export const useDashboardStatsStore = create<DashboardStatsStore>((set, get) => ({
  stats: {
    agents: 0,
    activeAgents: 0,
    totalTasks: 0,
    systemHealth: 100,
  },
  agents: [],
  lastUpdate: new Date(),
  isConnected: false,

  connect: async (url: string) => {
    console.log('Connecting to OpenClaw Gateway:', url);
    try {
      await connectGateway(url);

      const client = getGatewayClient(url);

      // Listen for agent events
      client.on('agent_started', (data) => {
        console.log('Agent started:', data);
        const currentAgents = get().agents;
        set({
          agents: [...currentAgents, {
            id: data.agentId,
            status: 'busy',
            lastActivity: new Date().toISOString(),
          }],
          stats: { ...get().stats, activeAgents: get().stats.activeAgents + 1 },
        });
      });

      client.on('agent_stopped', (data) => {
        console.log('Agent stopped:', data);
        const currentAgents = get().agents.filter(a => a.id !== data.agentId);
        set({
          agents: currentAgents,
          stats: { ...get().stats, activeAgents: Math.max(0, get().stats.activeAgents - 1) },
        });
      });

      client.on('agent_created', (data) => {
        console.log('Agent created:', data);
        const currentAgents = get().agents;
        set({
          agents: [...currentAgents, {
            id: data.agentId,
            status: 'idle',
            lastActivity: new Date().toISOString(),
          }],
          stats: { ...get().stats, agents: get().stats.agents + 1 },
        });
      });

      // Periodically refresh stats (simulated for now)
      setInterval(async () => {
        try {
          const stats = client.getStats();
          const agents = client.getAgents();
          set({
            stats: { ...stats, systemHealth: Math.floor(Math.random() * 15) + 85 },
            agents,
            lastUpdate: new Date(),
          });
        } catch (err) {
          console.error('Error refreshing gateway stats:', err);
        }
      }, 5000);

      set({ isConnected: true });
    } catch (error) {
      console.error('Failed to connect to gateway:', error);
      set({ isConnected: false });
      throw error;
    }
  },

  refresh: async () => {
    // Triggered manually
  },

  disconnect: () => {
    const client = getGatewayClient();
    client.disconnect();
    set({ isConnected: false });
  },
}));