"use client";

import { motion } from "framer-motion";

/* ─── Solutions: tabbed mini-dashboards ─── */

export function SalesDashboard() {
  return (
    <div className="space-y-2.5 p-1">
      {[
        { lead: "sarah@meridian.io", subject: "Enterprise pricing inquiry", status: "Replied", time: "1m" },
        { lead: "mike@apex.com", subject: "Demo request — Q3 rollout", status: "Meeting booked", time: "4m" },
        { lead: "lisa@horizon.co", subject: "Partnership opportunity", status: "Qualifying", time: "7m" },
      ].map((item, i) => (
        <motion.div
          key={item.lead}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/3 px-3 py-2.5"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-[9px] font-semibold text-teal-400">
            {item.lead[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium">{item.subject}</p>
            <p className="truncate text-[9px] text-subtle">{item.lead}</p>
          </div>
          <span className="shrink-0 rounded-full bg-teal-500/10 px-2 py-0.5 text-[9px] font-medium text-teal-400">
            {item.status}
          </span>
          <span className="text-[9px] text-subtle">{item.time}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 flex items-center justify-between rounded-lg border border-teal-500/20 bg-teal-500/5 px-3 py-2"
      >
        <span className="text-[10px] text-muted">Lead response time</span>
        <span className="text-sm font-semibold text-teal-400">3x faster</span>
      </motion.div>
    </div>
  );
}

export function SupportDashboard() {
  return (
    <div className="space-y-2.5 p-1">
      {[
        { ticket: "#2847", subject: "Login issue after update", priority: "High", resolved: true },
        { ticket: "#2848", subject: "Billing cycle question", priority: "Medium", resolved: true },
        { ticket: "#2849", subject: "API integration help", priority: "Low", resolved: false },
      ].map((item, i) => (
        <motion.div
          key={item.ticket}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="flex items-center gap-3 rounded-lg border border-white/6 bg-white/3 px-3 py-2.5"
        >
          <span className="shrink-0 font-mono text-[10px] text-subtle">{item.ticket}</span>
          <p className="min-w-0 flex-1 truncate text-[11px]">{item.subject}</p>
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${
              item.priority === "High"
                ? "bg-red-500/10 text-red-400"
                : item.priority === "Medium"
                  ? "bg-amber-500/10 text-amber-400"
                  : "bg-white/5 text-subtle"
            }`}
          >
            {item.priority}
          </span>
          {item.resolved ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring" }}
              className="text-[10px] text-teal-400"
            >
              ✓
            </motion.span>
          ) : (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          )}
        </motion.div>
      ))}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-3 overflow-hidden rounded-lg border border-white/6 bg-white/2 px-3 py-2"
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted">Auto-resolved today</span>
          <span className="font-semibold text-teal-400">87%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "87%" }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-teal-500/60"
          />
        </div>
      </motion.div>
    </div>
  );
}

export function OpsDashboard() {
  return (
    <div className="space-y-2.5 p-1">
      {[
        { from: "vendor@supplychain.io", type: "Vendor", action: "Routed to procurement" },
        { from: "partners@collab.com", type: "Partnership", action: "Draft ready" },
        { from: "hr@contractors.net", type: "Internal", action: "Archived" },
      ].map((item, i) => (
        <motion.div
          key={item.from}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="rounded-lg border border-white/6 bg-white/3 p-3"
        >
          <div className="flex items-center justify-between">
            <p className="truncate text-[10px] text-muted">{item.from}</p>
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-subtle">{item.type}</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.12 }}
            className="mt-1.5 text-[10px] text-teal-400/90"
          >
            → {item.action}
          </motion.p>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="flex items-center gap-4 rounded-lg border border-white/6 bg-white/2 px-3 py-2.5"
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-teal-400">10+</p>
          <p className="text-[9px] text-subtle">hrs saved/wk</p>
        </div>
        <div className="h-8 w-px bg-white/8" />
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">142</p>
          <p className="text-[9px] text-subtle">triaged today</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── How it works: step visuals ─── */

export function ConnectStepVisual() {
  return (
    <div className="relative flex flex-col items-center py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/4"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
          <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
          <path d="M4 7l8 6 8-6" stroke="#ea4335" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: 32 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="my-1 w-px bg-gradient-to-b from-teal-500/50 to-teal-500/10"
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-[200px] space-y-1.5 rounded-lg border border-white/6 bg-white/3 p-3"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-teal-400" />
          <span className="text-[10px] font-medium text-teal-400">Gmail connected</span>
        </div>
        <p className="text-[9px] text-subtle">team@acmecorp.com · 3 inboxes</p>
      </motion.div>
    </div>
  );
}

export function DnaStepVisual() {
  const files = ["Brand Guide.pdf", "Tone.md", "FAQ.docx"];
  return (
    <div className="py-4">
      <div className="space-y-1.5">
        {files.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-2 rounded-md border border-white/5 bg-white/2 px-2.5 py-1.5"
          >
            <div className="h-4 w-3 rounded-sm bg-teal-500/20" />
            <span className="text-[10px] text-muted">{f}</span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="ml-auto text-[9px] text-teal-400"
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="mt-3 rounded-lg border border-teal-500/20 bg-teal-500/5 p-2.5 text-center"
      >
        <p className="text-[10px] font-medium text-teal-400">DNA model trained</p>
        <p className="mt-0.5 text-[9px] text-subtle">Voice · Tone · Product knowledge</p>
      </motion.div>
    </div>
  );
}

export function DeployStepVisual() {
  return (
    <div className="py-4">
      <div className="relative rounded-lg border border-white/6 bg-white/2 p-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
          <span className="text-[10px] font-medium">3 agents deployed</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {["Sales agent", "Support agent", "Ops agent"].map((agent, i) => (
            <motion.div
              key={agent}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex items-center justify-between text-[10px]"
            >
              <span className="text-muted">{agent}</span>
              <span className="text-teal-400">Active</span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-2 flex items-center gap-2 rounded-md bg-white/3 px-2.5 py-1.5"
      >
        <span className="text-[9px] text-muted">Processing</span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[9px] text-teal-400"
        >
          12 emails handled today
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ─── Security visuals ─── */

export function OAuthVisual() {
  return (
    <div className="mt-4 flex items-center justify-center gap-3">
      <div className="rounded-lg border border-white/8 bg-white/3 p-2">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
          <path d="M4 7l8 6 8-6" stroke="#ea4335" strokeWidth="1.5" />
        </svg>
      </div>
      <motion.div
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-px w-8 bg-teal-500/40"
      />
      <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-2">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      </div>
    </div>
  );
}

export function EncryptionVisual() {
  return (
    <div className="mt-4 space-y-1 font-mono text-[9px]">
      {["AES-256 at rest", "TLS 1.3 in transit"].map((line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="flex items-center gap-2 text-muted"
        >
          <span className="text-teal-400">█</span>
          <span>{line}</span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.2 }}
            className="ml-auto text-teal-400"
          >
            enabled
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

export function RbacVisual() {
  const roles = [
    { role: "Admin", perms: "Full access", color: "text-teal-400" },
    { role: "Editor", perms: "Send & edit", color: "text-sky-400" },
    { role: "Viewer", perms: "Read only", color: "text-subtle" },
  ];
  return (
    <div className="mt-4 space-y-1">
      {roles.map((r, i) => (
        <motion.div
          key={r.role}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between rounded-md bg-white/2 px-2 py-1 text-[9px]"
        >
          <span className={`font-medium ${r.color}`}>{r.role}</span>
          <span className="text-subtle">{r.perms}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function AuditLogVisual() {
  const logs = [
    { action: "email.sent", user: "agent@sales" },
    { action: "dna.updated", user: "admin@acme" },
    { action: "member.invited", user: "admin@acme" },
  ];
  return (
    <div className="mt-4 max-h-[72px] space-y-1 overflow-hidden font-mono">
      {logs.map((log, i) => (
        <motion.div
          key={log.action}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          className="flex gap-2 text-[8px]"
        >
          <span className="text-subtle">14:3{i}</span>
          <span className="text-teal-400/80">{log.action}</span>
          <span className="truncate text-muted">{log.user}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Testimonial metric chips ─── */

export function TestimonialMetric({ before, after, label }: { before: string; after: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-4 flex items-center gap-3 rounded-lg border border-white/6 bg-white/2 px-3 py-2"
    >
      <div className="text-center">
        <p className="text-[10px] text-subtle line-through">{before}</p>
        <p className="text-xs font-semibold text-teal-400">{after}</p>
      </div>
      <div className="h-6 w-px bg-white/8" />
      <p className="text-[10px] text-muted">{label}</p>
    </motion.div>
  );
}
