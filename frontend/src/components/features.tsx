"use client";

import { motion } from "framer-motion";
import {
  AgentVisual,
  ControlVisual,
  DnaVisual,
  GmailVisual,
  OrgVisual,
  RealtimeVisual,
  RoutingVisual,
  TemplateVisual,
} from "./feature-visuals";

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function FeatureCard({
  label,
  title,
  description,
  visual,
  className = "",
  glow = false,
}: {
  label: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <motion.div
      variants={cardAnim}
      className={`group relative overflow-hidden rounded-2xl border border-white/7 bg-white/2 p-6 transition-colors hover:border-white/12 hover:bg-white/3 ${className}`}
    >
      {glow && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-500/8 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
      )}
      <div className="relative">
        <p className="text-[10px] font-medium uppercase tracking-wider text-teal-400/80">
          {label}
        </p>
        <h3
          className="mt-2 text-base font-semibold"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
        {visual}
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="platform" className="section-divider px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <p className="section-label mb-3">Platform</p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Everything your team needs to run email at scale
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            From inbox connection to on-brand replies — MailBOT is the complete
            email operations layer for growing organizations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.07 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Row 1 — wide org + gmail */}
          <FeatureCard
            label="Workspaces"
            title="Multi-tenant organizations"
            description="Create workspaces, invite team members, and manage permissions across departments."
            visual={<OrgVisual />}
            className="lg:col-span-2"
            glow
          />
          <FeatureCard
            label="Integration"
            title="Gmail connection"
            description="Secure OAuth 2.0. Read, classify, and send with full audit trails."
            visual={<GmailVisual />}
          />

          {/* Row 2 — DNA, routing, templates */}
          <FeatureCard
            label="Intelligence"
            title="Company DNA engine"
            description="Ingest brand guidelines and tone preferences. Every reply reflects your voice."
            visual={<DnaVisual />}
          />
          <FeatureCard
            label="Automation"
            title="Intelligent routing"
            description="Auto-categorize inbound mail and route to the right workflow instantly."
            visual={<RoutingVisual />}
          />
          <FeatureCard
            label="Templates"
            title="Dynamic reply library"
            description="Build approved templates. Agents personalize each one with full context."
            visual={<TemplateVisual />}
          />

          {/* Row 3 — wide agents */}
          <FeatureCard
            label="Agents"
            title="Autonomous reply generation"
            description="Each message gets a unique, context-aware response — not a copy-paste blast."
            visual={<AgentVisual />}
            className="lg:col-span-3"
            glow
          />

          {/* Row 4 — controls */}
          <FeatureCard
            label="Governance"
            title="Human-in-the-loop"
            description="Review, edit, or approve agent drafts before they send. Full control when you need it."
            visual={<ControlVisual />}
          />
          <FeatureCard
            label="Performance"
            title="Real-time processing"
            description="Messages categorized and drafted within seconds. No queue backlog."
            visual={<RealtimeVisual />}
            className="lg:col-span-2"
          />
        </motion.div>
      </div>
    </section>
  );
}
