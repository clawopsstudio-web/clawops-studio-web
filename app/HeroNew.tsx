'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

/* ─── Floating 3D shapes that react to scroll ─── */
function FloatingShapes() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax positions
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const orb3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const ringRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '180deg'])
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.15, 0])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Glowing orb 1 — top left */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
      >
        <div className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>

      {/* Glowing orb 2 — bottom right */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute -bottom-40 right-0 w-[600px] h-[600px]"
      >
        <div className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(102,0,255,0.2) 0%, rgba(102,0,255,0.05) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Rotating ring — center right */}
      <motion.div
        style={{ y: orb3Y, rotate: ringRotate }}
        className="absolute top-1/4 right-[10%] w-64 h-64"
      >
        <svg viewBox="0 0 256 256" className="w-full h-full opacity-25">
          <circle cx="128" cy="128" r="100" fill="none" stroke="#00D4FF" strokeWidth="1" strokeDasharray="8 12" />
          <circle cx="128" cy="128" r="80" fill="none" stroke="#6600FF" strokeWidth="0.5" strokeDasharray="4 16" />
          <circle cx="128" cy="128" r="60" fill="none" stroke="#00D4FF" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Perspective grid — bottom */}
      <motion.div
        style={{ y: gridY, opacity: gridOpacity }}
        className="absolute bottom-0 left-0 right-0 h-48"
      >
        <div className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(400px) rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        />
      </motion.div>

      {/* Floating particle dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#00D4FF]"
          style={{
            left: `${8 + i * 8}%`,
            top: `${15 + (i % 5) * 15}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── 3D floating cards that drift on scroll ─── */
function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Card 1 — top right */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute top-[20%] right-[8%] hidden md:block"
      >
        <div className="w-48 h-32 rounded-xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.05)] backdrop-blur-md p-4"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,212,255,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-xs text-[rgba(255,255,255,0.5)]">Agent active</span>
          </div>
          <div className="text-lg font-bold text-white">Sales Agent</div>
          <div className="text-xs text-[rgba(255,255,255,0.3)] mt-1">Processing 47 leads</div>
        </div>
      </motion.div>

      {/* Card 2 — bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute bottom-[30%] left-[5%] hidden lg:block"
      >
        <div className="w-44 h-28 rounded-xl border border-[rgba(102,0,255,0.2)] bg-[rgba(102,0,255,0.05)] backdrop-blur-md p-4"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        >
          <div className="text-xs text-[rgba(255,255,255,0.4)] mb-1">API Costs</div>
          <div className="text-2xl font-bold text-white">$0.00</div>
          <div className="text-xs text-[#10b981] mt-1">-100% vs last month</div>
        </div>
      </motion.div>

      {/* Card 3 — mid right */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute top-[45%] right-[3%] hidden xl:block"
      >
        <div className="w-40 h-24 rounded-xl border border-[rgba(0,212,255,0.12)] bg-[rgba(0,0,0,0.3)] backdrop-blur-md p-4"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
        >
          <div className="text-xs text-[rgba(255,255,255,0.4)] mb-1">Integrations</div>
          <div className="flex -space-x-1">
            {['T', 'W', 'S', 'N', 'H'].map((l, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-[rgba(0,212,255,0.2)] border border-[rgba(0,0,0,0.3)] flex items-center justify-center text-[8px] text-[#00D4FF] font-bold">
                {l}
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[8px] text-[rgba(255,255,255,0.4)]">
              +495
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const QUICK_STATS = [
  { value: '$2,400', label: 'Avg saved / month' },
  { value: '3 min', label: 'Time to first agent' },
  { value: '500+', label: 'Integrations ready' },
]

const FEATURE_CARDS = [
  {
    icon: '🤖',
    title: 'Deploy Unlimited Agents',
    desc: 'Sales, Support, Research, Ops — run them all simultaneously on your own infrastructure.',
    color: '#00D4FF',
  },
  {
    icon: '💰',
    title: 'No API Bills. Ever.',
    desc: 'Your queries run locally. No per-token costs. No vendor lock-in. Flat monthly pricing.',
    color: '#6600FF',
  },
  {
    icon: '🔌',
    title: '500+ Tools, Pre-Connected',
    desc: 'Telegram, WhatsApp, Slack, HubSpot, GHL, Notion — your agents work with everything you use.',
    color: '#00D4FF',
  },
  {
    icon: '⚡',
    title: 'Instant Response',
    desc: 'Agents run on your infrastructure. No API queues. Sub-50ms response times, every time.',
    color: '#6600FF',
  },
  {
    icon: '🔒',
    title: 'Complete Data Privacy',
    desc: 'Client data never touches a third-party API. Full GDPR compliance. Your data, your server.',
    color: '#00D4FF',
  },
  {
    icon: '🌐',
    title: 'Works 24/7, Auto-Retries',
    desc: 'Agents recover from failures automatically. No babysitting. No ops team required.',
    color: '#6600FF',
  },
]

export default function HeroNew() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  return (
    <div className="relative overflow-hidden">

      {/* Fixed depth background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#08081a]">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating 3D shapes */}
      <FloatingShapes />
      <FloatingCards />

      {/* Main Hero Content */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Hero */}
        <div className="flex-1 flex items-center px-6 lg:px-12 pt-28 pb-16">
          <div className="max-w-3xl mx-auto md:mx-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] text-[#00D4FF] px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Deploy Your First Agent in 3 Minutes — No Credit Card
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.05] tracking-[-0.03em] mb-6"
            >
              <span className="text-white">Deploy Unlimited</span>
              <br />
              <span className="bg-gradient-to-r from-[#00D4FF] via-[#9966FF] to-[#00D4FF] bg-clip-text text-transparent">
                AI Agents.
              </span>
              <br />
              <span className="text-white">Pay Once.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[rgba(255,255,255,0.5)] mb-10 max-w-xl leading-relaxed"
            >
              ClawOps runs your entire AI workforce — Sales, Support, Research, Ops — on{' '}
              <span className="text-white">your own infrastructure</span>. No per-agent API bills.
              No token costs. Just flat, predictable pricing from day one.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00D4FF] to-[#6600FF] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl transition-opacity text-base"
              >
                Start Free — No Credit Card
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white font-medium px-8 py-4 rounded-xl transition-all text-base"
              >
                See How It Works
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-8 border-t border-[rgba(255,255,255,0.08)] pt-8"
            >
              {QUICK_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-xs md:text-sm text-[rgba(255,255,255,0.4)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[rgba(255,255,255,0.25)] text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[rgba(0,212,255,0.4)] to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
      </motion.div>

      {/* ── Product Demo Video ── */}
      <div className="relative z-10 px-6 lg:px-12 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">See It in Action</h2>
            <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">Real agent workflows. No staging. Click to play.</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-2xl shadow-[#00D4FF]/5">
            <div className="relative aspect-video bg-[#06060f]">
              <Image
                src="/clawops-ai-os-hero.jpg"
                alt="ClawOps demo — AI agent dashboard"
                fill
                className="object-cover"
                priority
              />
              {/* Play button */}
              <label className="absolute inset-0 flex items-center justify-center cursor-pointer group" htmlFor="hero-video-toggle">
                <div className="w-20 h-20 rounded-full bg-[rgba(0,212,255,0.15)] backdrop-blur-sm border border-[rgba(0,212,255,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#00D4FF]/30">
                    <svg className="w-5 h-5 text-[#06060f] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </label>
              {/* Hidden video — shown on click */}
              <input type="checkbox" id="hero-video-toggle" className="peer hidden" />
              <div className="absolute inset-0 peer-checked:hidden">
                <Image src="/clawops-ai-os-hero.jpg" alt="ClawOps demo" fill className="object-cover" priority />
                <label className="absolute inset-0 flex items-center justify-center cursor-pointer group" htmlFor="hero-video-toggle">
                  <div className="w-20 h-20 rounded-full bg-[rgba(0,212,255,0.15)] backdrop-blur-sm border border-[rgba(0,212,255,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#00D4FF]/30">
                      <svg className="w-5 h-5 text-[#06060f] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </label>
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-4 left-4 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] text-[#00D4FF] text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  12s demo
                </div>
              </div>
              <div className="hidden peer-checked:block absolute inset-0 bg-black">
                <video
                  src="/clawops-ai-os-demo.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="relative z-10 px-6 lg:px-12 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-5 hover:border-[rgba(0,212,255,0.2)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-[rgba(255,255,255,0.45)] leading-relaxed">{card.desc}</p>
                <div className="mt-3 h-px bg-gradient-to-r from-[rgba(0,212,255,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Social proof bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#00D4FF] to-[#6600FF] bg-clip-text text-transparent">
                  $3,000/mo
                </div>
                <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">Saved vs hiring humans</p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.06)]">
                <div className="text-3xl md:text-4xl font-black text-white">100%</div>
                <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">Private — no API data sharing</p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-[rgba(255,255,255,0.06)]">
                <div className="text-3xl md:text-4xl font-black text-white">3 min</div>
                <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">From signup to first agent live</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  )
}
