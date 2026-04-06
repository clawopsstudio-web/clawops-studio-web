'use client';

import React from "react";
import { motion } from "framer-motion";

export default function WhyClawOps() {
  const points = [
    {
      title: "No Prompt Engineering",
      desc: "Forget crafting the perfect prompt. We deploy pre-tested, high-accuracy agent workflows that just work."
    },
    {
      title: "48-Hour Deployment",
      desc: "Most systems take months. We get your AI employees running in your apps within two business days."
    },
    {
      title: "Managed Infrastructure",
      desc: "No server maintenance, no API rate-limit management. We host, monitor, and scale your agents for you."
    },
    {
      title: "Support That Scales",
      desc: "We don't just hand you tools. If a workflow breaks or needs tuning, we fix it."
    }
  ];

  return (
    <section className="bg-[#04040c] py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Why ClawOps vs. DIY?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {points.map((p, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-[rgba(255,255,255,0.5)]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
