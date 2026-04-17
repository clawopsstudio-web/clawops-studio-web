'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/providers/AuthProvider'

interface ContaboInstance {
  instance_id: string
  name: string
  ip_v4: string | null
  product_id: string
  product_name: string
  status: string
  region: string
  ram_mb: number
  cpu_cores: number
}

const STATUS_COLORS: Record<string, string> = {
  running: 'bg-green-500/20 text-green-400 border-green-500/30',
  provisioning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  installing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  pending_payment: 'bg-red-500/20 text-red-400 border-red-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  stopped: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

export default function ContaboManager() {
  const [connected, setConnected] = useState<boolean | null>(null) // null = loading
  const [instances, setInstances] = useState<ContaboInstance[]>([])
  const [showConnect, setShowConnect] = useState(false)
  const [form, setForm] = useState({ client_id: '', client_secret: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState('')
  const [manualMode, setManualMode] = useState(false)
  const [manualForm, setManualForm] = useState({
    instance_id: '',
    name: '',
    ip_v4: '',
    product_id: '',
    region: '',
  })

  useEffect(() => {
    checkConnection()
  }, [])

  const { user } = useAuth()

  const checkConnection = async () => {
    if (!user) return
    const res = await fetch('/api/integrations')
    const integData = await res.json()
    const contabo = integData.integrations?.contabo
    setConnected(contabo?.connected || false)
    if (contabo?.connected) loadInstances()
  }

  const loadInstances = async () => {
    const res = await fetch('/api/contabo/instances')
    const json = await res.json()
    if (json.instances) setInstances(json.instances)
  }

  const connectContabo = async () => {
    setError('')
    setSaving(true)
    const res = await fetch('/api/contabo/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const json = await res.json()
    if (json.error) {
      setError(json.error)
    } else {
      setConnected(true)
      setShowConnect(false)
      loadInstances()
    }
    setSaving(false)
  }

  const syncInstances = async () => {
    setSyncing(true)
    setSyncMsg('')
    const res = await fetch('/api/contabo/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'fetch_from_contabo' }),
    })
    const json = await res.json()
    setSyncMsg(json.error || `Synced ${json.synced} instance(s)`)
    if (json.instances) setInstances(json.instances)
    setTimeout(() => setSyncMsg(''), 4000)
    setSyncing(false)
  }

  const registerManual = async () => {
    if (!manualForm.instance_id.trim()) return
    const res = await fetch('/api/contabo/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register_instance', ...manualForm }),
    })
    const json = await res.json()
    if (json.instance) {
      setInstances([...instances, json.instance])
      setManualForm({ instance_id: '', name: '', ip_v4: '', product_id: '', region: '' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Contabo VPS Instances</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {connected === null ? 'Checking...' : connected ? 'Connected to Contabo API' : 'Not connected'}
          </p>
        </div>
        <div className="flex gap-2">
          {connected && (
            <button
              onClick={syncInstances}
              disabled={syncing}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              {syncing ? '↻ Syncing...' : '↻ Sync from Contabo'}
            </button>
          )}
          <button
            onClick={() => setShowConnect(!showConnect)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              connected
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-cyan-600 hover:bg-cyan-500'
            }`}
          >
            {connected ? 'Edit Credentials' : '+ Connect Contabo'}
          </button>
        </div>
      </div>

      {syncMsg && (
        <div className="mb-3 text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2">
          {syncMsg}
        </div>
      )}

      {/* Connect Form */}
      {showConnect && (
        <div className="mb-4 p-4 bg-gray-800/50 rounded-lg space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Client ID</label>
            <input
              type="text"
              placeholder="INT-xxxxxxx"
              value={form.client_id}
              onChange={(e) => setForm({ ...form, client_id: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Client Secret</label>
            <input
              type="password"
              placeholder="s3RBY1JlWLhBz7Mk..."
              value={form.client_secret}
              onChange={(e) => setForm({ ...form, client_secret: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={connectContabo}
              disabled={saving || !form.client_id || !form.client_secret}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              {saving ? 'Connecting...' : 'Save & Connect'}
            </button>
            <button
              onClick={() => { setShowConnect(false); setError('') }}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Instances List */}
      {instances.length === 0 && connected ? (
        <p className="text-gray-500 text-sm">No instances found. Click "Sync from Contabo" to fetch.</p>
      ) : instances.length > 0 ? (
        <div className="space-y-2">
          {instances.map((inst) => (
            <div key={inst.instance_id} className="p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{inst.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_COLORS[inst.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                    {inst.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {inst.cpu_cores}vCPU / {Math.round(inst.ram_mb / 1024)}GB RAM
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {inst.ip_v4 && <span className="font-mono">{inst.ip_v4}</span>}
                <span>{inst.product_name || inst.product_id}</span>
                <span>{inst.region}</span>
                <span className="text-gray-600">ID: {inst.instance_id}</span>
              </div>
            </div>
          ))}
        </div>
      ) : !connected ? (
        <div>
          <p className="text-gray-500 text-sm mb-3">Connect your Contabo account to sync VPS instances automatically.</p>
          <button
            onClick={() => setManualMode(!manualMode)}
            className="text-xs text-gray-500 hover:text-gray-400 underline"
          >
            Add instance manually instead
          </button>
        </div>
      ) : null}

      {/* Manual Entry */}
      {manualMode && (
        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg space-y-3">
          <h4 className="text-sm font-medium">Add Instance Manually</h4>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Instance ID (e.g. 203211554)"
              value={manualForm.instance_id}
              onChange={(e) => setManualForm({ ...manualForm, instance_id: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Name (e.g. vmi3211554)"
              value={manualForm.name}
              onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="IPv4 (e.g. 144.91.86.170)"
              value={manualForm.ip_v4}
              onChange={(e) => setManualForm({ ...manualForm, ip_v4: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              placeholder="Product ID (e.g. V95)"
              value={manualForm.product_id}
              onChange={(e) => setManualForm({ ...manualForm, product_id: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={registerManual}
            disabled={!manualForm.instance_id.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            Add Instance
          </button>
        </div>
      )}
    </motion.div>
  )
}
