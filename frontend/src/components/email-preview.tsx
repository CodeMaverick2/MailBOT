"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Inbox,
  LayoutDashboard,
  Settings,
  Tag,
  Users,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Inbox, label: "Inbox", active: true },
  { icon: Users, label: "Team", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const messages = [
  {
    from: "sarah.chen@meridian.io",
    subject: "Enterprise plan — pricing inquiry",
    tag: "Sales Lead",
    tagColor: "text-teal-400 bg-teal-500/10",
    time: "2m ago",
    reply:
      "Hi Sarah — thank you for your interest in our Enterprise plan. I've shared our pricing deck and scheduled a call with our account team for Thursday at 2 PM EST.",
    delay: 0.6,
  },
  {
    from: "support@northwind.com",
    subject: "Re: Integration documentation",
    tag: "Support",
    tagColor: "text-sky-400 bg-sky-500/10",
    time: "8m ago",
    reply:
      "Thanks for reaching out. I've attached the updated API documentation and a step-by-step integration guide. Let me know if you need anything else.",
    delay: 1.1,
  },
];

export function EmailPreview() {
  return (
    <div className="surface-raised overflow-hidden rounded-xl shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/6 bg-white/2 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <span className="mx-auto text-[11px] text-subtle">app.mailbot.io — Acme Corp</span>
      </div>

      <div className="flex min-h-[380px]">
        <aside className="hidden w-48 shrink-0 border-r border-white/6 bg-white/1 p-3 sm:block">
          <div className="mb-4 px-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-subtle">Workspace</p>
            <p className="mt-0.5 truncate text-xs font-medium">Acme Corp</p>
          </div>
          <nav className="space-y-0.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                    item.active
                      ? "bg-teal-500/10 font-medium text-teal-400"
                      : "text-muted"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Inbox</h3>
              <p className="text-[11px] text-muted">12 messages · 3 pending review</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-teal-500/10 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              <span className="text-[10px] font-medium text-teal-400">Agents active</span>
            </div>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.from}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: msg.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="rounded-lg border border-white/6 bg-white/2 p-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">{msg.subject}</p>
                    <p className="mt-0.5 truncate text-[11px] text-muted">{msg.from}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${msg.tagColor}`}>
                      {msg.tag}
                    </span>
                    <span className="text-[10px] text-subtle">{msg.time}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: msg.delay + 0.4, duration: 0.4 }}
                  className="mt-3 border-t border-white/5 pt-3"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-teal-400/90">
                    <Bot className="h-3 w-3" />
                    Draft reply · Company DNA
                    <Tag className="ml-auto h-2.5 w-2.5 text-subtle" />
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{msg.reply}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
