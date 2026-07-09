"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Headphones, LineChart, Users } from "lucide-react";
import { useState } from "react";
import {
  OpsDashboard,
  SalesDashboard,
  SupportDashboard,
} from "./section-visuals";

const solutions = [
  {
    id: "sales",
    icon: LineChart,
    title: "Sales & Business Development",
    description:
      "Respond to inbound leads within minutes. Agents qualify prospects, share relevant materials, and book meetings — all in your team's voice.",
    metric: "3x faster lead response",
    visual: SalesDashboard,
  },
  {
    id: "support",
    icon: Headphones,
    title: "Customer Success",
    description:
      "Handle support inquiries, billing questions, and onboarding emails automatically. Escalate only what needs a human.",
    metric: "60% reduction in response time",
    visual: SupportDashboard,
  },
  {
    id: "ops",
    icon: Users,
    title: "Operations & Admin",
    description:
      "Triage vendor emails, partnership requests, and internal communications. Keep your ops team focused on high-value work.",
    metric: "10+ hours saved per week",
    visual: OpsDashboard,
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  const current = solutions[active];
  const Visual = current.visual;

  return (
    <section id="solutions" className="section-divider px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="section-label mb-3">Solutions</p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Built for every team that lives in email
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Whether you&apos;re closing deals or resolving tickets, MailBOT adapts
            to your workflow.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Tabs */}
          <div className="flex flex-col gap-2 lg:col-span-2">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={solution.id}
                  onClick={() => setActive(i)}
                  whileHover={{ x: 2 }}
                  className={`relative rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-teal-500/30 bg-teal-500/5"
                      : "border-white/6 bg-white/2 hover:border-white/10 hover:bg-white/3"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="solution-active"
                      className="absolute inset-0 rounded-xl border border-teal-500/20 bg-teal-500/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-teal-500/15 text-teal-400" : "bg-white/5 text-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{solution.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                        {solution.description}
                      </p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-xs font-medium text-teal-400"
                        >
                          {solution.metric}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Live preview panel */}
          <motion.div
            layout
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 lg:col-span-3"
          >
            <div className="flex items-center gap-2 border-b border-white/6 px-4 py-2.5">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-white/10" />
                <div className="h-2 w-2 rounded-full bg-white/10" />
                <div className="h-2 w-2 rounded-full bg-white/10" />
              </div>
              <span className="mx-auto text-[10px] text-subtle">
                MailBOT — {current.title.split(" ")[0]} Dashboard
              </span>
              <span className="flex items-center gap-1 text-[10px] text-teal-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
                Live
              </span>
            </div>
            <div className="p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
