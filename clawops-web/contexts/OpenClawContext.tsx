'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface Agent {
  name: string
  sessionCount: number
  lastSeen: string
  model: string
  isActive?: boolean
  host?: string
  platform?: string
  mode?: string
  version?: string
}

interface SystemHealth {
  cpuUsage?: number
  memory?: { used_mb?: number; total_mb?: number }
  diskUsage?: string
  uptime?: string
  uptimeMs?: number
}

interface ChannelMeta {
  name: string
  id: string
}

interface OpenClawState {
  agents: Agent[]
  system: SystemHealth
  connected: boolean
  isConnected: boolean
  state: Record<string, unknown>
  presence: string[]
  uptimeMs: number
  server: { version: string }
  rpc: (method: string, ...args: unknown[]) => Promise<unknown>
  hello: () => Promise<{ status: string; version: string; server?: { version: string } }>
  snapshot: () => Promise<{ uptimeMs?: number; presence?: string[]; agents?: Agent[] }>
  subscribe: (channel: string, handler: (payload: unknown) => void) => () => void
}

const OpenClawContext = createContext<OpenClawState>({
  agents: [],
  system: {},
  connected: false,
  isConnected: false,
  state: {},
  presence: [],
  uptimeMs: 0,
  server: { version: '' },
  rpc: async () => null,
  hello: async () => ({ status: 'error', version: '' }),
  snapshot: async () => ({}),
  subscribe: () => () => {},
})

export function useOpenClaw() {
  return useContext(OpenClawContext)
}

export function OpenClawProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const [system, setSystem] = useState<SystemHealth>({})
  const [state, setState] = useState<Record<string, unknown>>({})
  const [presence, setPresence] = useState<string[]>([])
  const [uptimeMs, setUptimeMs] = useState(0)
  const [serverVersion, setServerVersion] = useState('')

  const hello = useCallback(async () => {
    try {
      const res = await fetch('/api/openclaw-status/')
      if (!res.ok) return { status: 'error', version: '' }
      const data = await res.json()
      if (data.error) return { status: 'error', version: '' }
      setConnected(true)
      setAgents(data.agents || [])
      setSystem(data.system || {})
      setState(data)
      setUptimeMs(data.system?.uptimeMs || 0)
      setServerVersion(data.openclawVersion || '')
      setPresence([])
      return { status: 'ok', version: data.openclawVersion || '', server: { version: data.openclawVersion || '' } }
    } catch {
      setConnected(false)
      return { status: 'error', version: '' }
    }
  }, [])

  const snapshot = useCallback(async () => {
    return { uptimeMs, presence, agents }
  }, [uptimeMs, presence, agents])

  const rpc = useCallback(async (method: string, ..._args: unknown[]) => {
    try {
      const res = await fetch('/api/openclaw-status/')
      if (!res.ok) return null
      const data = await res.json()
      if (method === 'health') return data.system
      if (method === 'agents.list') return { agents: data.agents || [] }
      if (method === 'models.list') return { models: data.models || [] }
      return data
    } catch {
      return null
    }
  }, [])

  const subscribe = useCallback((channel: string, handler: (payload: unknown) => void) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/openclaw-status/')
        if (res.ok) {
          const data = await res.json()
          handler(data)
        }
      } catch {
        // Ignore
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    hello()
  }, [hello])

  const value: OpenClawState = {
    agents,
    system,
    connected,
    isConnected: connected,
    state,
    presence,
    uptimeMs,
    server: { version: serverVersion },
    rpc,
    hello,
    snapshot,
    subscribe,
  }

  return (
    <OpenClawContext.Provider value={value}>
      {children}
    </OpenClawContext.Provider>
  )
}
