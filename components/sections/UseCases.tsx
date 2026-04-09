'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const useCases = [
  {
    title: "Support Automation",
    description: "Your Support Agent answers tickets 24/7 — from WhatsApp, Slack, or Telegram. It handles FAQs, routes complex issues to your team, and follows up automatically. Your phone lights up with a message only when human judgment is actually needed.",
    badge: "SUPPORT",
    badgeColor: "#00D4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    metrics: "80% tickets resolved automatically",
    color: "#00D4FF",
  },
  {
    title: "Sales & Lead Intelligence",
    description: "Your Sales Agent finds leads, researches prospects, pulls tech stacks, and enriches CRM data — all from Telegram. You wake up to a prioritized lead list, not a blank spreadsheet. Follow up from your phone.",
    badge: "SALES",
    badgeColor: "#6600FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    metrics: "340 qualified leads enriched / week",
    color: "#6600FF",
  },
  {
    title: "Operations & Reporting",
    description: "Your Ops Agent pulls data every morning, builds reports, and delivers them to your phone before your first coffee. No more manual exports. No more 'I'll send that report later.' The data flows to you automatically.",
    badge: "OPS",
    badgeColor: "#00D4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    metrics: "Daily reports delivered to your phone",
    color: "#00D4FF",
  },
  {
    title: "Research & Market Intelligence",
    description: "Your Research Agent monitors competitors, tracks pricing, scrapes market data, and sends you summaries — on Telegram, while you sleep. You get intelligence updates before your day starts. Make decisions from your phone.",
    badge: "RESEARCH",
    badgeColor: "#6600FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M12 20h9M12 12h9M12 4h9M5 12H4a2 2 0 00-2 2v4a2 2 0 002 2h1M8 8H6a2 2 0 00-2 2v6a2 2 0 002 2h2M16 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    metrics: "Market updates delivered before 9 AM",
    color: "#6600FF",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="use-cases"
      className="relative bg-[#04040c] px-6 py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(102,0,255,0.05), transparent 60%)",
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
            Use Cases
          </p>
          <h2 className="mt-3 text-[clamp(1.5rem,4vw,2rem)] font-bold tracking-[-0.03em] text-white md:text-5xl">
            Your AI Team. Every Role.<br className="hidden md:block" /> Everywhere You Chat.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[rgba(255,255,255,0.5)]">
            Agents that work where you work — on Telegram, WhatsApp, Slack. Managing them from your phone is the default, not a feature.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {useCases.map((uc) => (
            <motion.div
              key={uc.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-300 hover:border-[rgba(255,255,255,0.15)]"
            >
              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${uc.color}, transparent)` }} />

              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${uc.color}15`, color: uc.color }}
                  >
                    {uc.badge}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{uc.title}</h3>
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${uc.color}10`, color: uc.color }}
                >
                  {uc.icon}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[rgba(255,255,255,0.5)]">
                {uc.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#10b981]" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-medium text-[#10b981]">{uc.metrics}</span>
                </div>
                <a href="/auth/signup" className="text-xs font-medium text-[rgba(255,255,255,0.3)] hover:text-white transition-colors">
                  Deploy this agent &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
