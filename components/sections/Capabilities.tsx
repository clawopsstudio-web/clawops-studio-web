'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    emoji: "🖥️",
    title: "Your Own VPS — Not Shared Cloud",
    description: "2-6 dedicated vCPUs, 4-12GB RAM, 50-200GB NVMe SSD. No noisy neighbors. Your agents never wait in someone else's queue.",
    highlight: "Fully dedicated resources. Always.",
  },
  {
    emoji: "🔒",
    title: "Local AI — Zero API Costs",
    description: "Run Gemma 4, Llama, or any open model on your VPS. Your prompts never leave your server. No API bills. No per-token math.",
    highlight: "Predictable cost. Every single month.",
  },
  {
    emoji: "🤖",
    title: "Multiple Agents, One VPS",
    description: "Deploy Sales, Support, Research, and Ops agents — all running simultaneously. Each handles its domain. You manage the team.",
    highlight: "Scale agents without scaling costs.",
  },
  {
    emoji: "🔌",
    title: "500+ Tools Connected",
    description: "Telegram, WhatsApp, Chrome, Slack, GHL, n8n, HubSpot, Notion, MCP. If it has an API or runs in a browser — your agents can use it.",
    highlight: "Most connected AI stack in its class.",
  },
  {
    emoji: "⚡",
    title: "Instant Responses — No Queues",
    description: "Your VPS processes every request. No API rate limits. No 429 errors. No waiting. Your agents respond in under 50ms, every time.",
    highlight: "50ms response time. Guaranteed.",
  },
  {
    emoji: "🔐",
    title: "Your Data Never Leaves Your Server",
    description: "Client data, strategies, pipelines — all on YOUR infrastructure. GDPR compliant. HIPAA-ready config available. You control everything.",
    highlight: "Complete data sovereignty. No exceptions.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative overflow-hidden bg-[#04040c] px-6 py-20 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(102,0,255,0.3), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.5)]">
            What You Get
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-[-0.03em] text-white md:text-5xl">
            One Stack. Everything Your AI Workers Need.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[rgba(255,255,255,0.5)]">
            Stop paying per message. Pay for infrastructure once — and run unlimited agents on it.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={item}
              className="group relative rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-300 hover:border-[rgba(0,212,255,0.3)] hover:bg-[rgba(255,255,255,0.04)]"
            >
              <div className="text-4xl mb-4">{cap.emoji}</div>
              <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">
                {cap.description}
              </p>
              <div className="mt-4 rounded-lg bg-[rgba(0,212,255,0.08)] px-3 py-1.5">
                <p className="text-xs font-medium text-[#00D4FF]">{cap.highlight}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {[
            "Pre-configured in 3 minutes",
            "No credit card to start",
            "Cancel anytime",
            "24/7 operation",
            "SSL encrypted",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#00D4FF]" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm text-[rgba(255,255,255,0.4)]">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
