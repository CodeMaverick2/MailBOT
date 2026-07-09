"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company: company.trim() || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="access" className="section-divider px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="surface-raised relative overflow-hidden rounded-2xl px-8 py-14 sm:px-16 sm:py-16"
        >
          <div className="relative mx-auto max-w-xl text-center">
            <p className="section-label mb-4">Get started</p>
            <h2
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Request early access
            </h2>
            <p className="mt-4 text-muted">
              We&apos;re onboarding teams in batches. Join the waitlist and we&apos;ll
              reach out when a spot opens in your region.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 space-y-3 text-left"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      disabled={loading}
                      className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition-colors placeholder:text-subtle focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/20 disabled:opacity-50"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Work email"
                      disabled={loading}
                      className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition-colors placeholder:text-subtle focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/20 disabled:opacity-50"
                    />
                  </div>
                  {error && (
                    <p className="text-center text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-600 text-sm font-medium text-white transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Request access
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-500/10 px-5 py-3 text-sm font-medium text-teal-400"
                >
                  <Check className="h-4 w-4" />
                  Application received. We&apos;ll be in touch shortly.
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-xs text-subtle">
              By submitting, you agree to our privacy policy. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
