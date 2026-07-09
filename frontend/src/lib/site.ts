export const siteConfig = {
  name: "MailBOT",
  tagline: "AI email operations built for teams",
  description:
    "Connect Gmail, define your company DNA, and let intelligent agents categorize and reply to every email in your brand voice.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mailbot.io",
  links: {
    github: "https://github.com/CodeMaverick2/MailBOT",
    contact: "hello@mailbot.io",
  },
} as const;
