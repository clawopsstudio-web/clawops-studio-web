'use client';

"use client";

import React, { useRef } from "react";
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionH1 = dynamic(() => import('framer-motion').then(mod => mod.motion.h1), { ssr: false });
const MotionP = dynamic(() => import('framer-motion').then(mod => mod.motion.p), { ssr: false });

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#04040c] pt-20"
    >
      <div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28"
      >
        <div className="flex flex-col items-center text-center">

          <MotionH1
            className="max-w-4xl text-[clamp(2rem,5vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl"
          >
            AI Workers. Already Set Up. Running in Your Apps.
            <br className="hidden md:block" />
          </MotionH1>

          <MotionP
            className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.48)] sm:mt-6 sm:text-base md:text-lg"
          >
            Support, research, content, and ops agents — deployed through Telegram, WhatsApp, Slack, and your browser. No prompt engineering. No setup weeks. Live in 48 hours.
          </MotionP>

          <MotionDiv
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#cta"
              className="group flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #6600FF)",
                boxShadow: "0 0 20px rgba(0,212,255,0.18), 0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Deploy Your AI Team
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon />
              </span>
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(255,255,255,0.09)] hover:border-[rgba(255,255,255,0.22)]"
            >
              See How It Works
            </a>
          </MotionDiv>

          <MotionDiv
            className="mt-8 grid w-full max-w-lg grid-cols-1 gap-3 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-4 backdrop-blur-sm sm:mt-10 sm:grid-cols-3 sm:gap-px sm:p-0"
          >
            {[
              { value: "24/7", label: "Always Running" },
              { value: "< 2 days", label: "Deploy Time" },
              { value: "99.9%", label: "Uptime SLA" },
            ].map((p) => (
              <div key={p.label} className="flex flex-col items-center py-4 sm:py-5">
                <span className="text-2xl font-bold text-white md:text-3xl">{p.value}</span>
                <span className="mt-1 text-xs text-[rgba(255,255,255,0.38)]">{p.label}</span>
              </div>
            ))}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
