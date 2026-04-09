'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  {
    emoji: "🧠",
    title: "Autonomous Execution, Not Just Chat",
    description: "Our agents don't wait for instructions. They plan their day, execute tasks across your tools, and report back when done. Your Sales Agent prospectively reaches out. Your Support Agent resolves tickets. Your Ops Agent builds your morning report. It happens without you prompting it.",
    highlight: "Agents run autonomously. You manage outcomes.",
    color: "#00D4FF",
  },
  {
    emoji: "🔗",
    title: "Built on OpenClaw — The Fastest-Growing AI OS",
    description: "We run on OpenClaw — the open-source agentic OS with 215K+ GitHub stars. That's the infrastructure. We add the business layer: pre-configured agents, one-click deployment, and the management UI so you never touch a terminal.",
    highlight: "Powered by OpenClaw. Refined for business.",
    color: "#6600FF",
  },
  {
    emoji: "💰",
    title: "Scale Without Hiring",
    description: "Adding a new AI agent costs nothing extra. One more Sales Agent for a new market? Deploy it in 3 minutes. You're limited by ambition, not headcount. Every agent runs on the same flat monthly plan.",
    highlight: "Unlimited agents. Same flat price.",
    color: "#00D4FF",
  },
  {
    emoji: "🌐",
    title: "Manage From Your Phone, 24/7",
    description: "Your agents work on Telegram, WhatsApp, and Slack — where you already are. A lead comes in at midnight? Your Sales Agent handles it. An issue escalates on a Sunday? Your Support Agent resolves it. Your business runs whether you're awake or not.",
    highlight: "Your AI workforce runs 24/7. You run it from your phone.",
    color: "#6600FF",
  },
  {
    emoji: "🔒",
    title: "Your Data. Your Agents. Your Infrastructure.",
    description: "Agents run on servers you control. Prompts, responses, client data — nothing routes through third-party AI APIs by default. Your data stays yours. Businesses handling sensitive client information stay compliant.",
    highlight: "Private by architecture. Not just by policy.",
    color: "#00D4FF",
  },
  {
    emoji: "🔄",
    title: "Agents That Collaborate",
    description: "Support Agent flags an upsell opportunity — it hands to Sales Agent with full context. Research Agent finds qualified leads — it routes them to your pipeline. Multiple agents working together as a real workforce, not siloed chatbots.",
    highlight: "Multi-agent collaboration built in by default.",
    color: "#6600FF",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const trustItems = [
  "Powered by OpenClaw (215K+ GitHub stars)",
  "No DevOps required",
  "Agents live in 3 minutes",
  "Works 24/7 autonomously",
  "Scale without hiring",
];

export default function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="capabilities" className="relative bg-[#04040c] px-6 py-16 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.04), transparent 70%)",
      }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[rgba(255,255,255,0.4)]">
            What ClawOps Gives You
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-white md:text-5xl">
            An Autonomous AI Workforce.<br className="hidden md:block" /> Not Another Chatbot.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-[rgba(255,255,255,0.45)] leading-relaxed">
            ClawOps gives you agents that run your business autonomously — powered by OpenClaw, configured for your industry, and managed from your phone.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <motion.div key={cap.title} variants={item}
              className="group rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-5 md:p-6 transition-all duration-300 hover:bg-[rgba(255,255,255,0.04)]"
              style={{ borderLeftColor: cap.color, borderLeftWidth: '2px' }}>
              <div className="text-3xl mb-3">{cap.emoji}</div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">{cap.description}</p>
              <div className="mt-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-3 py-2">
                <p className="text-xs font-medium" style={{ color: cap.color }}>{cap.highlight}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-8">
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
