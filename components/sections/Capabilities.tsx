'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    emoji: "🤖",
    title: "Pre-Built Agents That Work Day One",
    description: "You don't configure an agent from scratch. Sales Agent, Support Agent, Research Agent, Ops Agent — each comes pre-configured with prompts, tools, and workflows for real business tasks. Pick a role. Deploy. Done.",
    highlight: "Agents are ready. You're not starting from scratch.",
    color: "#00D4FF",
  },
  {
    emoji: "💰",
    title: "One Flat Price. No Token Bills.",
    description: "Every plan covers unlimited agents. No per-token billing. No AI credit system. No surprise invoice at end of month. You know what you're paying on the 1st. It stays the same on the 30th.",
    highlight: "Flat monthly. Predictable. No token math.",
    color: "#6600FF",
  },
  {
    emoji: "🔌",
    title: "500+ Integrations, Already Connected",
    description: "Telegram, WhatsApp, Slack, Discord, HubSpot, GHL, Notion, n8n, Firecrawl — pre-built connectors, OAuth handled, live in minutes. Your agents connect to your tools the same day you sign up.",
    highlight: "Most integrations live same day.",
    color: "#00D4FF",
  },
  {
    emoji: "🔒",
    title: "Your Data Stays on Your Infrastructure",
    description: "Agents run on your own server. Prompts, responses, client data — nothing routes through third-party AI APIs by default. Your data is yours. Privacy by architecture, not by policy.",
    highlight: "No third-party AI data exposure by default.",
    color: "#6600FF",
  },
  {
    emoji: "🌐",
    title: "Manage Your Team From Your Phone",
    description: "Your agents work on Telegram, WhatsApp, and Slack — the apps you already use. Message your Sales Agent from a coffee shop. Check your Support queue from bed. Your AI workforce goes where you go.",
    highlight: "Work from wherever you already work.",
    color: "#00D4FF",
  },
  {
    emoji: "🔄",
    title: "Agents That Collaborate",
    description: "Your Support Agent flags an upsell — it hands to your Sales Agent automatically. Your Research Agent finds a lead — it passes to your Sales Agent with full context. One workflow, multiple agents, zero manual handoffs.",
    highlight: "Multi-agent handoffs built in.",
    color: "#6600FF",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const trustItems = [
  "Pre-configured agents from day one",
  "No credit card to start",
  "Cancel anytime",
  "Works from Telegram / WhatsApp / Slack",
  "SSL encrypted",
];

export default function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="capabilities"
      className="relative bg-[#04040c] px-6 py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.04), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.4)]">
            What ClawOps Gives You
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-white md:text-5xl">
            Agents That Work.<br className="hidden md:block" /> Not Infrastructure to Configure.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-[rgba(255,255,255,0.45)] leading-relaxed">
            ClawOps gives you a team — not a server. Pre-built agents, pre-connected tools, and a workforce that starts delivering results on day one.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={item}
              className="group rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-5 md:p-6 transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)]"
              style={{ borderLeftColor: cap.color, borderLeftWidth: '2px' }}
            >
              <div className="text-3xl mb-3">{cap.emoji}</div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">
                {cap.description}
              </p>
              <div className="mt-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-3 py-2">
                <p className="text-xs font-medium" style={{ color: cap.color }}>{cap.highlight}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-8"
        >
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#00D4FF]" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs md:text-sm text-[rgba(255,255,255,0.35)]">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
