"use client";

import { motion } from "framer-motion";

export function OrgVisual() {
  const members = [
    { initials: "RK", role: "Admin", color: "bg-teal-500/20 text-teal-300" },
    { initials: "JO", role: "Editor", color: "bg-sky-500/20 text-sky-300" },
    { initials: "AL", role: "Viewer", color: "bg-violet-500/20 text-violet-300" },
    { initials: "MP", role: "Editor", color: "bg-amber-500/20 text-amber-300" },
  ];

  return (
    <div className="mt-6 space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-white/6 bg-white/3 px-3 py-2">
        <span className="text-[11px] font-medium">Acme Corp</span>
        <span className="rounded bg-teal-500/15 px-1.5 py-0.5 text-[9px] text-teal-400">Pro</span>
      </div>
      {members.map((m, i) => (
        <motion.div
          key={m.initials}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/2 px-3 py-2"
        >
          <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold ${m.color}`}>
            {m.initials}
          </div>
          <span className="flex-1 text-[10px] text-muted">member@{i === 0 ? "acme" : "team"}.io</span>
          <span className="text-[9px] text-subtle">{m.role}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function GmailVisual() {
  return (
    <div className="mt-6 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/4"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
          <path d="M4 7l8 6 8-6" stroke="#ea4335" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="my-3 h-px max-w-[80px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
        <span className="text-[10px] font-medium text-teal-400">Connected</span>
      </motion.div>
      <p className="mt-2 text-[9px] text-subtle">OAuth 2.0 · Read & Send</p>
    </div>
  );
}

export function DnaVisual() {
  const docs = ["Brand Guidelines.pdf", "Tone of Voice.md", "Product FAQ.docx"];
  const traits = ["Professional", "Concise", "Friendly"];

  return (
    <div className="mt-5 space-y-3">
      <div className="space-y-1.5">
        {docs.map((doc, i) => (
          <motion.div
            key={doc}
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-center gap-2 rounded-md border border-white/5 bg-white/2 px-2.5 py-1.5"
          >
            <div className="h-4 w-3 rounded-sm bg-teal-500/20" />
            <span className="truncate text-[10px] text-muted">{doc}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {traits.map((trait, i) => (
          <motion.span
            key={trait}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
            className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[9px] font-medium text-teal-400"
          >
            {trait}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function RoutingVisual() {
  const emails = [
    { subject: "Partnership inquiry", tag: "Sales", color: "bg-teal-500/15 text-teal-400" },
    { subject: "Invoice question", tag: "Billing", color: "bg-amber-500/15 text-amber-400" },
    { subject: "Bug report #2847", tag: "Support", color: "bg-sky-500/15 text-sky-400" },
  ];

  return (
    <div className="mt-5 space-y-2">
      {emails.map((email, i) => (
        <motion.div
          key={email.subject}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="min-w-0 flex-1 truncate rounded-md border border-white/5 bg-white/2 px-2 py-1.5 text-[10px] text-muted">
            {email.subject}
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 300 }}
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${email.color}`}
          >
            {email.tag}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export function TemplateVisual() {
  return (
    <div className="mt-5 rounded-lg border border-white/6 bg-white/2 p-3 font-mono text-[10px] leading-relaxed">
      <p className="text-subtle">Hi {"{{first_name}}"},</p>
      <p className="mt-1.5 text-muted">
        Thanks for your interest in{" "}
        <span className="rounded bg-teal-500/15 px-1 text-teal-400">{"{{product}}"}</span>.
        I&apos;ve attached our{" "}
        <span className="rounded bg-teal-500/15 px-1 text-teal-400">{"{{resource}}"}</span>{" "}
        and would love to schedule a call.
      </p>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "60%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-2 h-1 rounded-full bg-teal-500/30"
      />
      <p className="mt-1 text-[9px] text-teal-400/70">Personalizing…</p>
    </div>
  );
}

export function AgentVisual() {
  const lines = [
    "Analyzing context from thread…",
    "Applying company DNA…",
    "Drafting personalized reply…",
  ];

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-white/6 bg-white/2 p-3">
        <p className="text-[10px] font-medium text-muted">Inbound</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-subtle">
          &ldquo;Hi, we&apos;re interested in your enterprise plan. Can you share pricing and set up a demo?&rdquo;
        </p>
        <p className="mt-2 text-[9px] text-subtle">sarah@meridian.io · 2m ago</p>
      </div>
      <div className="relative rounded-lg border border-teal-500/20 bg-teal-500/5 p-3">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
          <p className="text-[10px] font-medium text-teal-400">Agent drafting</p>
        </div>
        <div className="mt-2 space-y-1">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.3 }}
              className="text-[9px] text-muted"
            >
              ✓ {line}
            </motion.p>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="mt-2 text-[10px] leading-relaxed text-foreground/80"
        >
          Hi Sarah — thanks for reaching out! I&apos;ve attached our enterprise pricing deck…
        </motion.p>
      </div>
    </div>
  );
}

export function ControlVisual() {
  return (
    <div className="mt-5 flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="flex-1 rounded-lg border border-teal-500/30 bg-teal-500/10 py-2 text-[10px] font-medium text-teal-400"
      >
        Approve & Send
      </motion.button>
      <button className="flex-1 rounded-lg border border-white/8 py-2 text-[10px] text-muted">
        Edit draft
      </button>
      <button className="rounded-lg border border-white/8 px-3 py-2 text-[10px] text-subtle">
        ✕
      </button>
    </div>
  );
}

export function RealtimeVisual() {
  const events = [
    { time: "14:32:01", event: "Email received", status: "done" },
    { time: "14:32:02", event: "Categorized as Sales", status: "done" },
    { time: "14:32:04", event: "Draft generated", status: "active" },
  ];

  return (
    <div className="mt-5 space-y-1.5 font-mono">
      {events.map((e, i) => (
        <motion.div
          key={e.time}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.3 }}
          className="flex items-center gap-2 text-[9px]"
        >
          <span className="text-subtle">{e.time}</span>
          <span className={e.status === "active" ? "text-teal-400" : "text-muted"}>
            {e.event}
          </span>
          {e.status === "active" && (
            <span className="h-1 w-1 animate-pulse rounded-full bg-teal-400" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
