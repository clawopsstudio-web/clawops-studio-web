'use client';

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PLANS = [
  {
    name: "Starter",
    price: 49,
    originalPrice: 79,
    tagline: "Your first AI worker. Zero overhead.",
    highlight: false,
    color: "#00D4FF",
    workers: "1 Worker",
    workersDetail: "Support, Research, Content, or Ops",
    specs: {
      ram: "2 GB",
      storage: "20 GB NVMe",
      vcpus: "1 vCPU",
      bandwidth: "Unlimited",
      uptime: "99.5%",
    },
    models: ["Claude 4.4 (Mini)", "GPT-4o-mini", "Gemini 2.5-flash"],
    features: [
      "1 AI Worker (choose role)",
      "Telegram integration",
      "Browser automation",
      "50 tasks/month",
      "Email support",
      "1 team member",
      "7-day history",
    ],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Pro",
    price: 149,
    originalPrice: 249,
    tagline: "Full AI team. Real leverage.",
    highlight: true,
    color: "#6600FF",
    workers: "3 Workers",
    workersDetail: "Mix & match any roles",
    specs: {
      ram: "4 GB",
      storage: "60 GB NVMe",
      vcpus: "2 vCPU",
      bandwidth: "Unlimited",
      uptime: "99.9%",
    },
    models: [
      "Claude 4.6 (Opus)",
      "GPT-4o",
      "GPT-4o-mini",
      "Gemini 2.5-flash",
      "MiniMax 2.5",
      "Gemma 4 2B (local)",
    ],
    features: [
      "3 AI Workers (any roles)",
      "Telegram + WhatsApp + Discord",
      "Browser + API automation",
      "500 tasks/month",
      "Priority support (4h SLA)",
      "5 team members",
      "30-day history",
      "Webhook + Zapier + n8n",
      "Custom instructions",
      "Monthly strategy call",
    ],
    cta: "Deploy Pro Team",
    popular: true,
  },
  {
    name: "Agency",
    price: 399,
    originalPrice: 599,
    tagline: "Scale to your entire client roster.",
    highlight: false,
    color: "#00D4FF",
    workers: "10 Workers",
    workersDetail: "Deploy across clients",
    specs: {
      ram: "8 GB",
      storage: "200 GB NVMe",
      vcpus: "4 vCPU",
      bandwidth: "Unlimited",
      uptime: "99.95%",
    },
    models: [
      "Claude 4.6 (Opus)",
      "GPT-4o",
      "GPT-4o-mini",
      "Gemini 2.5-flash",
      "MiniMax 2.5",
      "Gemma 4 2B (local)",
      "Ollama any model",
    ],
    features: [
      "10 AI Workers (any roles)",
      "All messaging platforms",
      "Browser + API + MCP automation",
      "Unlimited tasks",
      "Dedicated support (1h SLA)",
      "Unlimited team members",
      "90-day history",
      "White-label dashboard",
      "Client sub-accounts",
      "Custom integrations",
      "Weekly strategy sessions",
      "SLA guarantee",
    ],
    cta: "Go Agency Scale",
    popular: false,
  },
];

const MODEL_INFO = [
  {
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    context: "200K tokens",
    strength: "Long documents, deep reasoning",
    bestFor: "Research, analysis, strategy",
    badge: "Best for reasoning",
    color: "#FF6B35",
  },
  {
    name: "GPT-4.4",
    provider: "OpenAI",
    context: "128K tokens",
    strength: "Code, structured outputs, function calling",
    bestFor: "DevOps, automation, structured tasks",
    badge: "Best for coding",
    color: "#00D4FF",
  },
  {
    name: "MiniMax 2.5",
    provider: "MiniMax",
    context: "100K tokens",
    strength: "Fast, cost-effective, multilingual",
    bestFor: "High-volume content, translation",
    badge: "Best value",
    color: "#00FF88",
  },
  {
    name: "Gemma 4 2B",
    provider: "Google (local)",
    context: "8K tokens",
    strength: "Zero API cost, offline capable, private",
    bestFor: "Simple tasks, privacy-sensitive workloads",
    badge: "Best for privacy",
    color: "#6600FF",
  },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5 text-[rgba(255,255,255,0.15)]" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPageClient() {
  const [annual, setAnnual] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <main className="min-h-screen bg-[#04040c]">
      {/* Hero */}
      <div ref={headerRef} className="relative overflow-hidden px-6 pt-32 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,212,255,0.1),transparent_60%)]" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <p className="pre-label mb-4">PRICING</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
            AI Workers.
            <br />
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#6600FF] bg-clip-text text-transparent">
              Priced to actually make sense.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-[rgba(255,255,255,0.5)] sm:text-lg">
            No per-message billing surprises. No hidden infra costs. Flat monthly
            subscriptions with everything included.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-1">
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                annual
                  ? "bg-gradient-to-r from-[#00D4FF] to-[#6600FF] text-white shadow-lg"
                  : "text-[rgba(255,255,255,0.45)] hover:text-white"
              }`}
            >
              Annual
              <span className="ml-2 rounded bg-[rgba(255,255,255,0.15)] px-1.5 py-0.5 text-[10px]">Save 40%</span>
            </button>
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                !annual
                  ? "bg-gradient-to-r from-[#00D4FF] to-[#6600FF] text-white shadow-lg"
                  : "text-[rgba(255,255,255,0.45)] hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>
        </motion.div>
      </div>

      {/* Pricing cards */}
      <div className="relative px-6 pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.highlight ? "ring-2 ring-[#6600FF] ring-offset-2 ring-offset-[#04040c]" : ""
              }`}
              style={{ gridRow: plan.highlight ? "span 1" : "auto" }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="rounded-b-xl bg-gradient-to-r from-[#6600FF] to-[#00D4FF] px-5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-white shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  plan.highlight
                    ? "border-[rgba(102,0,255,0.4)] bg-[rgba(102,0,255,0.06)]"
                    : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ background: plan.color, boxShadow: `0 0 8px ${plan.color}` }}
                    />
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: plan.color }}>
                      {plan.workers}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                  <p className="mt-1 text-sm text-[rgba(255,255,255,0.45)]">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tight text-white">
                      ${annual ? Math.round(plan.price * 0.6) : plan.price}
                    </span>
                    <span className="mb-2 text-sm text-[rgba(255,255,255,0.35)]">/mo</span>
                    {annual && (
                      <span className="mb-3 rounded bg-[rgba(0,255,136,0.12)] px-2 py-0.5 text-xs text-[#00FF88]">
                        billed annually
                      </span>
                    )}
                  </div>
                  {annual && (
                    <p className="mt-1 text-xs text-[rgba(255,255,255,0.25)] line-through">
                      ${plan.originalPrice}/mo regular
                    </p>
                  )}
                </div>

                {/* Specs */}
                <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3">
                  {[
                    { label: "RAM", value: plan.specs.ram },
                    { label: "vCPUs", value: plan.specs.vcpus },
                    { label: "Storage", value: plan.specs.storage },
                    { label: "Uptime", value: plan.specs.uptime },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.25)]">{s.label}</span>
                      <span className="mt-0.5 text-sm font-semibold text-white">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Models */}
                <div className="mb-6">
                  <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-[rgba(255,255,255,0.25)]">
                    Included Models
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.models.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-2 py-1 text-[10px] text-[rgba(255,255,255,0.6)]"
                      >
                        {m}
                      </span>
                    ))}
                    {plan.models.includes("Gemma 4 2B (local)") && (
                      <span className="rounded-md border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.06)] px-2 py-1 text-[10px] text-[#00FF88]">
                        local
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckIcon />
                      <span className="text-sm text-[rgba(255,255,255,0.6)]">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className={`group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-[#6600FF] to-[#00D4FF] text-white shadow-lg shadow-[rgba(102,0,255,0.3)] hover:shadow-xl"
                      : "border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-white hover:border-[rgba(0,212,255,0.4)] hover:bg-[rgba(0,212,255,0.08)]"
                  }`}
                >
                  {plan.cta}
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Model comparison section */}
      <div className="relative border-t border-[rgba(255,255,255,0.06)] px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(102,0,255,0.06),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="pre-label mb-3">AI MODELS</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-white">
              Choose Your Brain
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[rgba(255,255,255,0.45)]">
              All plans include access to top-tier models. Pro and Agency unlock Gemma
              4 2B for local, zero-cost inference on your VPS.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {MODEL_INFO.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-5 hover:border-[rgba(255,255,255,0.15)] transition-colors"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${model.color}10, transparent 60%)`,
                  }}
                />
                <div className="relative z-10">
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase"
                      style={{
                        background: `${model.color}15`,
                        border: `1px solid ${model.color}30`,
                        color: model.color,
                      }}
                    >
                      {model.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[rgba(255,255,255,0.2)]">{model.provider}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{model.name}</h3>
                  <p className="mt-0.5 font-mono text-[10px] text-[rgba(255,255,255,0.3)]">{model.context} context</p>
                  <div className="mt-3 space-y-1.5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.2)]">Strength</span>
                      <p className="text-xs text-[rgba(255,255,255,0.55)]">{model.strength}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.2)]">Best for</span>
                      <p className="text-xs text-[rgba(255,255,255,0.55)]">{model.bestFor}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Local model setup info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 rounded-xl border border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.04)] p-5"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Run Gemma 4 2B locally — zero API cost</h4>
                <p className="mt-1 text-xs text-[rgba(255,255,255,0.45)]">
                  Pro and Agency plans include Ollama pre-installed on your VPS. Gemma 4 2B runs entirely
                  on your own hardware — no data leaves your server, and inference is free after setup.
                  Estimated install time: 10 minutes.
                </p>
                <p className="mt-2 font-mono text-[10px] text-[#00FF88]">
                  ollama run gemma3:2b
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <PricingFAQ />

      {/* CTA */}
      <div className="relative px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,212,255,0.08),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-2xl text-center"
        >
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[-0.03em] text-white">
            Not sure which plan fits?
          </h2>
          <p className="mt-4 text-[rgba(255,255,255,0.5)]">
            Book a free 30-minute strategy call. We&apos;ll map your workflows and recommend
            the right configuration — no sales pressure.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6600FF] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,212,255,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book Free Strategy Call
            <ArrowIcon />
          </a>
          <p className="mt-4 text-xs text-[rgba(255,255,255,0.25)]">
            Or email us at hello@clawops.studio
          </p>
        </motion.div>
      </div>
    </main>
  );
}

function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What's included in the VPS spec?",
      a: "Your subscription includes a fully managed VPS on Contabo with the listed RAM, storage, and vCPUs. We handle provisioning, security hardening, network setup, and ongoing maintenance. You own the VPS; we manage it.",
    },
    {
      q: "Can I change plans later?",
      a: "Yes. Upgrade instantly — your VPS specs will be updated. Downgrade takes effect at the next billing cycle. No lock-in.",
    },
    {
      q: "What counts as a 'task'?",
      a: "A task is a single unit of work completed by a worker — answering a support question, generating a lead list, drafting a report. Our flow-based billing tracks work done, not API tokens.",
    },
    {
      q: "How does the Agency plan work for client management?",
      a: "Agency gives you sub-accounts for each client. Each sub-account has its own workers, settings, and reporting. You control everything from a single dashboard. Fully white-label — your clients see your branding, not ours.",
    },
    {
      q: "Is Gemma 4 2B really free to run?",
      a: "Gemma 4 2B via Ollama runs on your VPS with zero API cost. It uses about 2GB RAM. Setup takes ~10 minutes. Great for simple, repetitive tasks where you want zero variable billing.",
    },
    {
      q: "What's the 99.9% uptime guarantee?",
      a: "Pro and Agency plans include a 99.9% uptime SLA. If we drop below that in any calendar month, you receive a prorated credit. Our actual track record is 99.95%.",
    },
  ];

  return (
    <div className="border-t border-[rgba(255,255,255,0.06)] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="pre-label mb-3">FAQ</p>
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-white">Pricing Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
        >
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[rgba(255,255,255,0.06)] last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:text-white"
              >
                <span className="text-sm font-medium text-white/80">{faq.q}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  className={`flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  style={{ color: openIndex === i ? "#00D4FF" : "rgba(255,255,255,0.4)" }}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
