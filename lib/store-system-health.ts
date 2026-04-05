// Real-time System Health Store from OpenClaw Gateway
import { create } from 'zustand';

interface SystemHealth {
  memoryUsage: number;
  cpuUsage: number;
  diskUsage: number;
  lastUpdated: string;
}

interface SystemHealthStore {
  health: SystemHealth;
  isRefreshing: boolean;
  refresh: () => Promise<void>;
}

export const useSystemHealthStore = create<SystemHealthStore>((set, get) => ({
  health: {
    memoryUsage: 62,
    cpuUsage: 18,
    diskUsage: 34,
    lastUpdated: new Date().toISOString(),
  },
  isRefreshing: false,

  refresh: async () => {
    set({ isRefreshing: true });

    try {
      // Simulated real data for now (will connect to gateway in next step)
      await new Promise((r) => setTimeout(r, 300));

      set({
        health: {
          memoryUsage: Math.floor(Math.random() * 20) + 55,
          cpuUsage: Math.floor(Math.random() * 15) + 10,
          diskUsage: Math.floor(Math.random() * 15) + 25,
          lastUpdated: new Date().toISOString(),
        },
        isRefreshing: false,
      });
    } catch (error) {
      console.error('Error refreshing system health:', error);
      set({ isRefreshing: false });
    }
  },
}));

// Start refreshing system health automatically
export function startSystemHealthRefresh(intervalMs: number = 5000) {
  const store = useSystemHealthStore.getState();
  store.refresh();

  setInterval(() => {
    store.refresh();
  }, intervalMs);
}