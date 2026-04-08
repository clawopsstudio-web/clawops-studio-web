'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AgentConfig {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'stopped' | 'error';
  lastSeen: string;
}

export default function MissionControlPage() {
  const [activeTab, setActiveTab] = useState<'agents' | 'terminal' | 'models'>('agents');
  const [agents, setAgents] = useState<AgentConfig[]>([
    { id: '1', name: 'DevOps Agent', type: 'devops', status: 'running', lastSeen: '2 min ago' },
    { id: '2', name: 'Frontend Agent', type: 'frontend', status: 'running', lastSeen: '5 min ago' },
  ]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mission Control</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          {(['agents', 'terminal', 'models'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-cyan-500 text-black' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">AI Agents</h2>
            <div className="grid gap-4">
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-white/50">{agent.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      agent.status === 'running' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {agent.status}
                    </span>
                    <span className="text-sm text-white/40">{agent.lastSeen}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Tab */}
        {activeTab === 'terminal' && (
          <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-gray-900 px-4 py-2 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-4 font-mono text-sm">
              <p className="text-green-400">root@clawops:~# openclaw status</p>
              <p className="text-white/60 mt-2">Gateway: running (port 18789)</p>
              <p className="text-white/60">Agents: 2 active</p>
              <p className="text-white/60">Memory: 1.2 GB / 4 GB</p>
              <p className="text-green-400 mt-4">root@clawops:~# <span className="animate-pulse">_</span></p>
            </div>
          </div>
        )}

        {/* Models Tab */}
        {activeTab === 'models' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Model Configuration</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-medium mb-2">Gemma 3 2B (Local)</h3>
                <p className="text-sm text-white/50">Running on Ollama • http://localhost:11434</p>
                <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Active</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="font-medium mb-2">Cloud Models</h3>
                <p className="text-sm text-white/50">OpenRouter / OpenAI / Anthropic</p>
                <span className="inline-block mt-2 px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">Not configured</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}