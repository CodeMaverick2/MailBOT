"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { EmailPreview } from "./email-preview";
import { LogoStrip } from "./logo-strip";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative px-6 pb-16 pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={item} className="section-label mb-5">
            Now in private beta
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            AI email operations
            <br />
            <span className="text-teal-400">built for teams</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            MailBOT connects your organization&apos;s Gmail, learns your company DNA,
            and deploys intelligent agents that categorize and respond to every
            inbound message — individually, on-brand, at scale.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#access"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-teal-600 px-6 text-sm font-medium text-white transition-colors hover:bg-teal-500"
            >
              Request early access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#platform"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-6 text-sm font-medium text-foreground transition-colors hover:bg-white/4"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Explore platform
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-3 gap-6 border-y border-white/6 py-8 sm:gap-12"
          >
            {[
              { value: "< 2 min", label: "Average setup time" },
              { value: "99.9%", label: "Uptime SLA target" },
              { value: "SOC 2", label: "Security roadmap" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-xl font-semibold sm:text-2xl"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-16"
        >
          <EmailPreview />
        </motion.div>

        <LogoStrip />
      </div>
    </section>
  );
}
