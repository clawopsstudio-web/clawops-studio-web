'use client'

import { useState, useEffect } from 'react'

interface MCP {
  id: string
  name: string
  description: string
  version: string
  enabled: boolean
  icon?: string
}

export default function MCPLibrary() {
  const [mpcs, setMCPCs] = useState<MCP[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)

  const handleConnectSmithery = async () => {
    setLoading(true)
    setMessage('🔗 Connecting to Smithery.ai...')
    // In production, integrate with Smithery.ai API
    await new Promise(resolve => setTimeout(resolve, 1500))
    setConnected(true)
    setMessage('✅ Connected to Smithery.ai!')
    fetchMCPCs()
    setLoading(false)
  }

  const fetchMCPCs = async () => {
    setLoading(true)
    // In production, fetch from Smithery.ai API
    // const response = await fetch('https://api.smithery.ai/mcps')
    // const data = await response.json()
    await new Promise(resolve => setTimeout(resolve, 500))
    setMCPCs([
      {
        id: '1',
        name: 'File System',
        description: 'Read, write, and manipulate files',
        version: '1.0.0',
        enabled: false,
        icon: '📁'
      },
      {
        id: '2',
        name: 'Web Browser',
        description: 'Automate browser actions',
        version: '1.0.0',
        enabled: false,
        icon: '🌐'
      },
      {
        id: '3',
        name: 'Database Query',
        description: 'Query SQL databases',
        version: '1.0.0',
        enabled: false,
        icon: '📊'
      },
      {
        id: '4',
        name: 'API Client',
        description: 'Make HTTP requests to APIs',
        version: '1.0.0',
        enabled: false,
        icon: '🔌'
      },
      {
        id: '5',
        name: 'GitHub',
        description: 'Interact with GitHub repositories',
        version: '1.0.0',
        enabled: false,
        icon: '🐙'
      },
      {
        id: '6',
        name: 'Slack',
        description: 'Post messages to Slack channels',
        version: '1.0.0',
        enabled: false,
        icon: '💬'
      }
    ])
    setLoading(false)
  }

  const toggleMCP = async (id: string) => {
    setMCPCs(mpcs.map(mcp =>
      mcp.id === id ? { ...mcp, enabled: !mcp.enabled } : mcp
    ))
    // In production, save to Supabase
    setMessage('✅ MCP state saved')
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const filteredMCPCs = mpcs.filter(mcp =>
    mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mcp.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">MCP Library</h1>
      <p className="text-gray-400 mb-8">Model Context Protocol integrations</p>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search MCPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#2d2d44] rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
        <button
          onClick={handleConnectSmithery}
          disabled={connected || loading}
          className={`px-6 py-2 rounded-lg font-semibold ${
            connected
              ? 'bg-[#10b981] text-white cursor-default'
              : 'bg-gradient-to-r from-[#00D4FF] to-[#6600FF] text-white hover:opacity-90 transition-opacity'
          } ${loading ? 'opacity-50' : ''}`}
        >
          {connected ? '✅ Connected' : loading ? 'Connecting...' : '🔗 Connect Smithery.ai'}
        </ MCP Button>
      </div>

      {/* Connected Indicator */}
      {connected && (
        <div className="bg-[#1a1a2e] border border-[#10b981] rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold">Connected to Smithery.ai</p>
              <p className="text-sm text-gray-400">You can now browse and enable MCPs</p>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className="bg-[#1a1a2e] border border-[#2d2d44] rounded-lg p-4 mb-8">
          <p className="text-sm">{message}</p>
        </div>
      )}

      {/* MCP Grid */}
      {loading && !mpcs.length ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D4FF] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading MCPs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMCPCs.map((mcp) => (
            <div
              key={mcp.id}
              className={`bg-[#1a1a2e] rounded-xl p-6 border transition-all ${
                mcp.enabled
                  ? 'border-[#10b981] bg-[#0a1a0f]'
                  : 'border-[#2d2d44] hover:border-[#00D4FF]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{mcp.icon || '🧩'}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{mcp.name}</h3>
                    <span className="text-xs text-gray-400">v{mcp.version}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleMCP(mcp.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mcp.enabled
                      ? 'bg-[#10b981]/20 text-[#10b981]'
                      : 'bg-[#2d2d44] text-gray-300 hover:bg-[#3d3d54]'
                  }`}
                >
                  {mcp.enabled ? 'Active' : 'Enable'}
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-4">{mcp.description}</p>

              {mcp.enabled && (
                <div className="bg-[#0f0f1a] rounded-lg p-3 mb-4">
                  <p className="text-xs text-[#10b981]">
                    ✅ MCP is active and ready to use
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 bg-[#2d2d44] hover:bg-[#3d3d54] text-white font-medium py-2 rounded-lg transition-colors text-sm">
                  Documentation
                </button>
                <button
                  onClick={() => setMessage('⚙️ Configuring...')}
                  className="flex-1 bg-[#2d2d44] hover:bg-[#3d3d54] text-white font-medium py-2 rounded-lg transition-colors text-sm"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMCPCs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No MCPs found</p>
          <button
            onClick={fetchMCPCs}
            className="px-6 py-2 bg-[#2d2d44] hover:bg-[#3d3d54] text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 bg-[#1a1a2e] rounded-xl p-6 border border-[#2d2d44]">
        <h2 className="text-xl font-semibold mb-4">About MCP Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">📦 What are MCPs?</h3>
            <p className="text-gray-400 text-sm">
              Model Context Protocol allows AI agents to connect with external tools
              and services through a standardized interface.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">🛠️ How to use</h3>
            <p className="text-gray-400 text-sm">
              Connect to Smithery.ai to browse available MCPs, then enable the ones
              you need for your workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}