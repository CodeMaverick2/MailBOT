"use client";

import { motion } from "framer-motion";
import { TestimonialMetric } from "./section-visuals";

const testimonials = [
  {
    quote:
      "MailBOT cut our inbound response time from hours to minutes. Our sales team finally stopped living in Gmail.",
    author: "Rachel Kim",
    role: "VP of Sales",
    company: "Meridian",
    metric: { before: "4.2 hrs", after: "8 min", label: "avg. lead response" },
    stars: 5,
  },
  {
    quote:
      "The company DNA feature is what sold us. Every reply actually sounds like it came from our team — not a bot.",
    author: "James Okonkwo",
    role: "Head of Customer Success",
    company: "Northwind",
    metric: { before: "42%", after: "91%", label: "on-brand reply score" },
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.svg
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 fill-amber-400"
        >
          <path d="M8 1.5l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 1.5z" />
        </motion.svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section-divider px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="section-label mb-3">Early access partners</p>
          <h2
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            What teams are saying
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-white/7 bg-white/2 p-7 transition-shadow hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-500/5 blur-2xl" />

              <div className="relative">
                <Stars count={t.stars} />

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="mt-4 text-[15px] leading-relaxed text-foreground/90"
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.p>

                <TestimonialMetric
                  before={t.metric.before}
                  after={t.metric.after}
                  label={t.metric.label}
                />

                <footer className="mt-5 flex items-center gap-3 border-t border-white/6 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/10 text-xs font-semibold text-teal-400 ring-1 ring-teal-500/20">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-medium">{t.author}</cite>
                    <p className="text-xs text-muted">
                      {t.role}, <span className="text-subtle">{t.company}</span>
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs font-medium text-subtle"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {t.company}
                  </span>
                </footer>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
