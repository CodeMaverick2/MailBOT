import { Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Platform", href: "#platform" },
    { label: "Solutions", href: "#solutions" },
    { label: "Security", href: "#security" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#access" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#security" },
  ],
};

export function Footer() {
  return (
    <footer className="section-divider px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 ring-1 ring-teal-500/20">
                <Mail className="h-3.5 w-3.5 text-teal-400" strokeWidth={2} />
              </div>
              <span
                className="text-[15px] font-semibold"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                MailBOT
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              AI-powered email operations for modern teams. Categorize, respond,
              and scale — without losing your brand voice.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium uppercase tracking-wider text-subtle">
                {category}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} MailBOT, Inc. All rights reserved.
          </p>
          <p className="text-xs text-subtle">San Francisco · Remote-first</p>
        </div>
      </div>
    </footer>
  );
}
