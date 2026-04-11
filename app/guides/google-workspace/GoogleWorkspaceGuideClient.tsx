'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Connect n8n to Google Workspace',
    description: 'n8n uses OAuth to connect to Google Workspace. This is the most secure method.',
    detail: '1. In n8n, go to Settings → Apps\n2. Find Google in the app list\n3. Click "Connect"\n4. Sign in with your Google account\n5. Grant the requested permissions (Gmail, Drive, Docs, Sheets, Calendar)\n6. n8n will store the OAuth token securely',
    icon: '🔐',
    tip: 'Use a dedicated Google Workspace account, not your personal Gmail, for better access control.',
  },
  {
    title: 'Enable Google Workspace MCP in n8n',
    description: 'Once OAuth is connected, enable the Google Workspace MCP server in n8n.',
    detail: '1. In n8n, go to Settings → MCP\n2. Find "Google Workspace" in the available MCP servers\n3. Toggle it ON\n4. The MCP endpoint will be: https://your-n8n.com/mcp/{id}\n5. Copy this URL',
    icon: '📁',
    tip: 'The MCP endpoint is the same base URL with different server IDs for different integrations.',
  },
  {
    title: 'Add to ClawOps MCP Library',
    description: 'Register the Google Workspace MCP in your ClawOps dashboard.',
    detail: '1. Go to Settings → Integrations → MCP Servers\n2. The "n8n-google" server is pre-configured\n3. If you have a custom n8n instance, add the MCP URL manually\n4. Click "Test Connection"\n5. You should see 44 available tools',
    icon: '🔌',
    tip: 'The pre-configured n8n-google server connects to ClawOps VPS n8n. For your own n8n, add it manually.',
  },
  {
    title: 'Available Tools (44 total)',
    description: 'Once connected, your AI agents can use all of these Google Workspace tools.',
    detail: 'Gmail: Read messages, send emails, search, manage labels\nDrive: Upload files, search, share, create folders\nDocs: Create docs, read content, update formatting\nSheets: Create sheets, read/write cells, manage tabs\nCalendar: List events, create events, update attendees\nTasks: List tasks, create tasks, mark complete\nYouTube: List videos, search (read-only)',
    icon: '✅',
    tip: 'All tools use the n8n MCP protocol. They\'re fast and reliable because n8n handles the API calls.',
  },
]

export default function GoogleWorkspaceGuideClient() {
  const [openStep, setOpenStep] = useState<number | null>(null)

  return (
    <div className="min-h-screen py-32 px-4" style={{ background: '#0a0a0f' }}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-gray-300">Google Workspace</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📁</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'rgba(66,133,244,0.15)', color: '#4285F4' }}>Productivity</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Set Up Google Workspace</h1>
          <p className="text-gray-400 mb-4">
            Connect Gmail, Drive, Docs, Sheets, Calendar and more. AI agents can read emails, create documents, and manage your calendar — all through n8n MCP.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span>⏱️ 5 min</span><span>•</span><span>🆓 Free</span><span>•</span><span>44 tools available</span>
          </div>
        </motion.div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden" style={{ background: '#1a1a2e', border: '1px solid #2d2d44' }}>
              <button onClick={() => setOpenStep(openStep === i ? null : i)}
                className="w-full flex items-center gap-4 p-5 text-left">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: openStep === i ? 'linear-gradient(135deg, #00D4FF, #6600FF)' : '#2d2d44', color: openStep === i ? 'white' : '#9ca3af' }}>
                  {i + 1}
                </div>
                <span className="text-lg font-medium text-white flex-1">{step.title}</span>
                <span className="text-2xl text-gray-400">{openStep === i ? '−' : '+'}</span>
              </button>
              {openStep === i && (
                <div className="px-5 pb-5 ml-12 space-y-4">
                  <p className="text-gray-400 text-sm">{step.description}</p>
                  <pre className="rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed"
                    style={{ background: '#0f0f1a', border: '1px solid #2d2d44' }}>{step.detail}</pre>
                  <div className="flex items-start gap-2 text-sm text-amber-400/80 rounded-lg p-3"
                    style={{ background: 'rgba(251,191,36,0.08)' }}>
                    <span>💡</span><span>{step.tip}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10 pt-6" style={{ borderTop: '1px solid #2d2d44' }}>
          <Link href="/guides/n8n-setup" className="text-sm text-gray-400 hover:text-white transition-colors">← n8n Setup</Link>
          <Link href="/guides/chrome-vnc" className="text-sm text-[#00D4FF] hover:text-[#00b8e6]">Chrome VNC →</Link>
        </div>
      </div>
    </div>
  )
}
