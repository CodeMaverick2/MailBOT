"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ConnectStepVisual,
  DeployStepVisual,
  DnaStepVisual,
} from "./section-visuals";

const steps = [
  {
    step: "01",
    title: "Connect your workspace",
    description:
      "Link your organization's Gmail accounts via secure OAuth. Set up team permissions and shared inboxes in under two minutes.",
    visual: ConnectStepVisual,
  },
  {
    step: "02",
    title: "Configure company DNA",
    description:
      "Upload brand guidelines, product documentation, and communication preferences. MailBOT builds a knowledge model unique to your company.",
    visual: DnaStepVisual,
  },
  {
    step: "03",
    title: "Deploy intelligent agents",
    description:
      "Agents categorize incoming mail, draft personalized replies, and send on your behalf — with optional human review at every step.",
    visual: DeployStepVisual,
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-divider px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="section-label mb-3">How it works</p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Go live in three steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            No complex integrations. No engineering resources required. Connect,
            configure, and let your agents handle the rest.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Animated pipeline */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/2">
              <div className="border-b border-white/6 px-4 py-2.5">
                <span className="text-[10px] text-subtle">Setup wizard</span>
              </div>
              <div className="p-6">
                {/* Progress bar */}
                <div className="mb-6 flex items-center gap-2">
                  {steps.map((s, i) => (
                    <div key={s.step} className="flex flex-1 items-center gap-2">
                      <motion.div
                        animate={{
                          backgroundColor: i <= activeStep ? "rgba(20, 184, 166, 0.2)" : "rgba(255,255,255,0.05)",
                          borderColor: i <= activeStep ? "rgba(20, 184, 166, 0.4)" : "rgba(255,255,255,0.1)",
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-mono"
                      >
                        <span className={i <= activeStep ? "text-teal-400" : "text-subtle"}>
                          {i + 1}
                        </span>
                      </motion.div>
                      {i < steps.length - 1 && (
                        <motion.div
                          className="h-px flex-1"
                          animate={{
                            backgroundColor: i < activeStep ? "rgba(20, 184, 166, 0.4)" : "rgba(255,255,255,0.08)",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step visual */}
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  {(() => {
                    const Visual = steps[activeStep].visual;
                    return <Visual />;
                  })()}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Step cards */}
          <div className="space-y-3">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.button
                  key={step.step}
                  onClick={() => setActiveStep(i)}
                  onMouseEnter={() => setActiveStep(i)}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`w-full rounded-xl border p-5 text-left transition-all ${
                    isActive
                      ? "border-teal-500/25 bg-teal-500/5"
                      : "border-white/6 bg-white/2 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-xs ${isActive ? "text-teal-400" : "text-subtle"}`}
                    >
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      <motion.p
                        animate={{ opacity: isActive ? 1 : 0.6 }}
                        className="mt-2 text-sm leading-relaxed text-muted"
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
