"use client";

import { motion } from "framer-motion";

const companies = [
  "Meridian",
  "Northwind",
  "Apex Labs",
  "Clearpath",
  "Vertex",
  "Horizon",
];

export function LogoStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-20 text-center"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">
        Built for modern teams
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {companies.map((name) => (
          <span
            key={name}
            className="text-sm font-medium tracking-tight text-muted/50 transition-colors hover:text-muted"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
