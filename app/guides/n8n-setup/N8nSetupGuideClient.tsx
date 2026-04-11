'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Enable MCP in n8n',
    description: 'n8n has built-in MCP server support. Enable it from your n8n settings.',
    detail: '1. Log in to your n8n instance\n2. Go to Settings → MCP (Model Context Protocol)\n3. Toggle "Enable MCP Server" to ON\n4. Note the MCP endpoint URL — it looks like:\n   https://your-n8n.com/mcp/{server-id}\n5. Copy this URL',
    icon: '⚙️',
    tip: 'The MCP server uses session-based authentication. ClawOps handles this automatically.',
  },
  {
    title: 'Get Your n8n API Key',
    description: 'Create an API key for ClawOps to authenticate with your n8n instance.',
    detail: '1. In n8n, go to Settings → API\n2. Click "Create API Key"\n3. Name it "ClawOps"\n4. Copy the API key — it starts with "n8n_" or is a Bearer token\n5. Keep it secure — you won\'t see it again',
    icon: '🔑',
    tip: 'API keys are per-instance. You\'ll need one for each n8n instance you connect.',
  },
  {
    title: 'Add n8n to ClawOps',
    description: 'Register your n8n instance in the ClawOps MCP Library.',
    detail: '1. Go to Settings → Integrations → n8n\n2. Enter your n8n instance URL (e.g. https://n8n.yourdomain.com)\n3. Paste your API key\n4. Click "Connect"\n5. ClawOps will verify the connection and show available tools',
    icon: '🔗',
    tip: 'For self-hosted n8n, make sure your instance is accessible via Tailscale or has a public URL.',
  },
  {
    title: 'Test the Connection',
    description: 'Verify n8n is properly connected by listing available workflows.',
    detail: '1. Go to Mission Control\n2. Ask your agent: "List my n8n workflows"\n3. You should see a list of your n8n workflows\n4. Try: "Trigger the onboarding workflow for new user email@example.com"\n5. Check your n8n to confirm the workflow ran',
    icon: '✅',
    tip: 'MCP tools in n8n depend on which n8n nodes have MCP support. More nodes are added regularly.',
  },
]

export default function N8nSetupGuideClient() {
  const [openStep, setOpenStep] = useState<number | null>(null)

  return (
    <div className="min-h-screen py-32 px-4" style={{ background: '#0a0a0f' }}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-gray-300">n8n Setup</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚙️</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,154,60,0.15)', color: '#FF9A3C' }}>Automation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Set Up n8n Workflow Automation</h1>
          <p className="text-gray-400 mb-4">
            Connect n8n to give your AI agents the power to trigger workflows, query databases, and automate complex business processes.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span>⏱️ 4 min</span><span>•</span><span>🆓 Free</span><span>•</span><span>Self-hosted or cloud</span>
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
          <Link href="/guides/ghl-mcp" className="text-sm text-gray-400 hover:text-white transition-colors">← GHL MCP</Link>
          <Link href="/guides/google-workspace" className="text-sm text-[#00D4FF] hover:text-[#00b8e6]">Google Workspace →</Link>
        </div>
      </div>
    </div>
  )
}
