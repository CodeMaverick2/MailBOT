"use client";

import { motion } from "framer-motion";
import {
  AuditLogVisual,
  EncryptionVisual,
  OAuthVisual,
  RbacVisual,
} from "./section-visuals";

const securityFeatures = [
  {
    title: "OAuth 2.0 authentication",
    description: "Industry-standard Google OAuth. We never store your Gmail password.",
    visual: OAuthVisual,
    span: "",
  },
  {
    title: "Encrypted at rest & in transit",
    description: "All data encrypted with AES-256. TLS 1.3 for every connection.",
    visual: EncryptionVisual,
    span: "",
  },
  {
    title: "Role-based access control",
    description: "Granular permissions per team member. Admin, editor, and viewer roles.",
    visual: RbacVisual,
    span: "",
  },
  {
    title: "SOC 2 Type II roadmap",
    description: "Security and compliance built in from day one. Audit logs for every action.",
    visual: AuditLogVisual,
    span: "sm:col-span-2",
  },
];

export function TrustSection() {
  return (
    <section id="security" className="section-divider px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="section-label mb-3">Security</p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Enterprise-grade from day one
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Your email data is sensitive. We treat it that way — with the
            security infrastructure your IT team expects.
          </p>
        </motion.div>

        {/* Central shield visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-10 flex max-w-sm flex-col items-center"
        >
          <div className="absolute inset-0 rounded-full bg-teal-500/5 blur-3xl" />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-teal-500/20 bg-teal-500/5"
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z" />
              <motion.path
                d="M9 12l2 2 4-4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex gap-3"
          >
            {["SOC 2", "GDPR", "OAuth 2.0"].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-[10px] font-medium text-muted"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {securityFeatures.map((feature, i) => {
            const Visual = feature.visual;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`group overflow-hidden rounded-xl border border-white/6 bg-white/2 p-5 transition-colors hover:border-white/10 hover:bg-white/3 ${feature.span}`}
              >
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.description}</p>
                <Visual />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
