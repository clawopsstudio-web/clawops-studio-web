'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    title: 'Your AI Infrastructure',
    description: 'Pre-configured VPS with GPU-ready infrastructure. Deploy your AI workers in minutes.',
    icon: '🖥️'
  },
  {
    title: 'Local, Private AI',
    description: 'No API costs. Run powerful AI models like Gemma 4 completely locally on your own infrastructure.',
    icon: '🔒'
  },
  {
    title: 'Multi-Agent Ecosystem',
    description: 'Run multiple specialized AI agents in one instance. Each agent can focus on different tasks.',
    icon: '🤖'
  },
  {
    title: '500+ Integrations',
    description: 'Connect to any service via API, webhook, or MCP. Your AI works with everything you use.',
    icon: '🔌'
  },
  {
    title: 'Zero Latency',
    description: 'Your agents run on your own VPS. No queuing, no external dependencies, instant response.',
    icon: '⚡'
  },
  {
    title: 'Complete Privacy',
    description: 'Your data never leaves your infrastructure. Full control and compliance with your own VPS.',
    icon: '🔐'
  }
]

export default function HeroNew() {
  const [animatedFeatures, setAnimatedFeatures] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      if (current < FEATURES.length) {
        setAnimatedFeatures(current + 1)
        current++
      } else {
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#0f0f1a]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Animated Orbs */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: i % 2 === 0 ? '600px' : '400px',
              height: i % 2 === 0 ? '600px' : '400px',
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(102, 0, 255, 0.15) 0%, transparent 70%)',
              left: `${i * 25}%`,
              top: `${i * 10}%`,
              animation: `pulse ${8 + i * 2}s ease-in-out infinite`
            }}
          />
        ))}

        {/* Animated Lines */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-[#00D4FF] to-transparent opacity-20"
            style={{
              width: `${200 + Math.sin(Date.now() / 1000 + i) * 50}px`,
              height: '2px',
              left: `${20 + i * 30}%`,
              top: `${40 + i * 10}%`,
              animation: `flow ${3 + i}s linear infinite`
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FEATURES.slice(0, 3).map((feature, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${5 + i * 30}%`,
              top: `${10 + Math.sin(Date.now() / 2000 + i) * 5}%`,
              animation: `float ${4 + i}s ease-in-out infinite`
            }}
          >
            {feature.icon}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 lg:px-12 py-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#6600FF] bg-clip-text text-transparent">
            ClawOps
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#00D4FF] hover:bg-[#00b8e8] text-[#0a0a1a] font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="min-h-screen flex items-center px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2d2d44] hover:bg-[#3d3d54] text-gray-300 px-4 py-2 rounded-full text-sm mb-8 transition-colors">
              <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
              Now with Multi-Agent Support
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Build Your AI<br />
              <span className="bg-gradient-to-r from-[#00D4FF] via-[#6600FF] to-[#00D4FF] bg-clip-text text-transparent">
                Infrastructure,
              </span>
              <br />
              Not Your AI Costs
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-10 max-w-2xl">
              Deploy pre-configured AI agents on your own VPS. No per-user fees, no API costs. 
              <span className="text-white"> Just powerful, private AI infrastructure.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-[#00D4FF] to-[#6600FF] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg transition-opacity"
              >
                Start Building Free
              </Link>
              <Link
                href="/how-it-works"
                className="bg-[#2d2d44] hover:bg-[#3d3d54] text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-[#2d2d44] pt-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">$3,000</div>
                <div className="text-gray-500 text-sm">Saved / month</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">3 min</div>
                <div className="text-gray-500 text-sm">To deploy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-gray-500 text-sm">Integrations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Features */}
        <div className="relative z-10 px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className={`bg-[#1a1a2e] border border-[#2d2d44] rounded-xl p-6 transition-all ${
                  index < animatedFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Divider */}
        <div className="relative z-10 px-6 lg:px-12 py-16 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-transparent to-transparent opacity-20" />
            <div className="bg-[#0a0a1a] rounded-2xl p-8 md:p-12 border border-[#2d2d44]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#6600FF] bg-clip-text text-transparent mb-2">
                    $3,000/mo
                  </div>
                  <p className="text-gray-400">
                    What you save vs. hiring humans
                  </p>
                </div>
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#6600FF] to-[#00D4FF] bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <p className="text-gray-400">
                    Local AI - No API costs
                  </p>
                </div>
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#6600FF] bg-clip-text text-transparent mb-2">
                    3 min
                  </div>
                  <p className="text-gray-400">
                    Time to deploy your first agent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes flow {
          0% { transform: translateX(-100px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100px) rotate(180deg); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .gradient-text {
          background: linear-gradient(to right, #00D4FF, #6600FF, #00D4FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}