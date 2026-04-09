'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Skill {
  id?: string
  name: string
  description: string
  category: string
  icon?: string
  agent: string[]
  enabled: boolean
  example: string
}

const AVAILABLE_SKILLS = [
  {
    id: 'lead-responder',
    name: 'Lead Responder',
    description: 'Automatically respond to leads within seconds using AI. Never miss a sales opportunity.',
    category: 'Sales',
    icon: '📨',
    agent: ['Marketing Agent', 'Sales Agent'],
    enabled: false,
    example: 'Replies to lead form submissions, qualifies prospects, books meetings'
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Generate blog posts, social media content, and marketing copy at scale.',
    category: 'Marketing',
    icon: '✍️',
    agent: ['Content Agent', 'Marketing Agent'],
    enabled: false,
    example: 'Creates 10 LinkedIn posts, writes blog articles, drafts email campaigns'
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handle customer inquiries automatically with intelligent responses.',
    category: 'Support',
    icon: '💬',
    agent: ['Support Agent'],
    enabled: false,
    example: 'Answers FAQs, processes refunds, escalates complex issues'
  },
  {
    id: 'data-researcher',
    name: 'Data Researcher',
    description: 'Research competitors, find leads, analyze market trends.',
    category: 'Research',
    icon: '🔍',
    agent: ['Research Agent'],
    enabled: false,
    example: 'Scrapes competitor websites, finds decision makers, compiles reports'
  },
  {
    id: 'social-media-manager',
    name: 'Social Media Manager',
    description: 'Post, schedule, and engage on all social platforms automatically.',
    category: 'Marketing',
    icon: '📱',
    agent: ['Content Agent'],
    enabled: false,
    example: 'Posts to LinkedIn, creates Twitter threads, comments on posts'
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Optimizer',
    description: 'Improve search rankings with automated keyword research and content optimization.',
    category: 'Marketing',
    icon: '📈',
    agent: ['Content Agent'],
    enabled: false,
    example: 'Finds keywords, optimizes content, tracks rankings'
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Automate invoicing and payment reminders for your business.',
    category: 'Finance',
    icon: '💵',
    agent: ['Finance Agent'],
    enabled: false,
    example: 'Generates invoices, sends reminders, tracks payments'
  },
  {
    id: 'calendar-manager',
    name: 'Calendar Manager',
    description: 'Schedule meetings, manage appointments, send reminders.',
    category: 'Operations',
    icon: '📅',
    agent: ['Operations Agent'],
    enabled: false,
    example: 'Books calls, syncs calendars, cancels conflicts'
  }
]

export default function SkillsLibrary() {
  const [skills] = useState<Skill[]>(AVAILABLE_SKILLS)
  const [message, setMessage] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredSkills = filter === 'all' ? skills : skills.filter(s => s.category === filter)

  const handleEnableSkill = async (skillId: string) => {
    const skill = skills.find(s => s.id === skillId)
    if (!skill) return

    setMessage(`🔧 Enabling ${skill.name}...`)

    // In production, save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))

    setMessage(`✅ ${skill.name} enabled!`)
    skill.enabled = !skill.enabled

    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Skills Library</h1>
      <p className="text-gray-400 mb-8">Pre-built AI skills that work out of the box</p>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-[#00D4FF] text-white' : 'bg-[#2d2d44] text-gray-300 hover:bg-[#3d3d54]'
          }`}
        >
          All
        </button>
        {['Sales', 'Marketing', 'Support', 'Research', 'Finance', 'Operations'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === cat ? 'bg-[#00D4FF] text-white' : 'bg-[#2d2d44] text-gray-300 hover:bg-[#3d3d54]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {message && (
        <div className="bg-[#1a1a2e] border border-[#2d2d44] rounded-lg p-4 mb-8">
          <p className="text-sm">{message}</p>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className={`rounded-xl p-6 border transition-all ${
              skill.enabled
                ? 'bg-[#0a1a0f] border-[#10b981]'
                : 'bg-[#1a1a2e] border-[#2d2d44] hover:border-[#00D4FF]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{skill.icon || '🧩'}</span>
                <div>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-xs text-gray-400 bg-[#2d2d44] px-2 py-1 rounded">
                    {skill.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => skill.id && handleEnableSkill(skill.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  skill.enabled
                    ? 'bg-[#10b981]/20 text-[#10b981]'
                    : 'bg-[#2d2d44] text-gray-300 hover:bg-[#3d3d54]'
                }`}
              >
                {skill.enabled ? 'Active' : 'Enable'}
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-4">{skill.description}</p>

            <div className="bg-[#0f0f1a] rounded-lg p-3 mb-4">
              <p className="text-xs text-[#00D4FF] mb-2">How it works:</p>
              <p className="text-xs text-gray-300">{skill.example}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Works with:</p>
              <div className="flex flex-wrap gap-1">
                {skill.agent.map(a => (
                  <span key={a} className="text-xs bg-[#2d2d44] text-gray-400 px-2 py-1 rounded">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMessage('📋 Copying skill configuration...')}
              className="w-full bg-[#2d2d44] hover:bg-[#3d3d54] text-white font-medium py-2 rounded-lg transition-colors text-sm"
            >
              Copy Configuration
            </button>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-[#1a1a2e] rounded-xl p-6 border border-[#2d2d44]">
        <h2 className="text-xl font-semibold mb-4">What Are Skills?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">📦 Pre-built capabilities</h3>
            <p className="text-gray-400 text-sm">
              Skills are pre-configured AI behaviors that can be deployed to your agents with one click.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">🚀 Deploy instantly</h3>
            <p className="text-gray-400 text-sm">
              Copy the skill configuration and deploy it to your agent. No coding required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}