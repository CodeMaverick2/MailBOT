import { serverEnv } from "@/lib/env";
import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid work email"),
  company: z.string().trim().max(120).optional(),
});

const rateLimit = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimit.get(ip);
  if (last && now - last < RATE_LIMIT_MS) return true;
  rateLimit.set(ip, now);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const { email, company } = parsed.data;
    const payload = {
      email,
      company: company || null,
      source: "landing-page",
      submittedAt: new Date().toISOString(),
      ip,
    };

    if (serverEnv.WAITLIST_WEBHOOK_URL) {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (serverEnv.WAITLIST_WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = serverEnv.WAITLIST_WEBHOOK_SECRET;
      }

      const webhookRes = await fetch(serverEnv.WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!webhookRes.ok) {
        console.error("Waitlist webhook failed:", webhookRes.status, await webhookRes.text());
        return NextResponse.json(
          { error: "Unable to process your request. Please try again later." },
          { status: 502 },
        );
      }
    } else if (serverEnv.NODE_ENV === "development") {
      console.log("[waitlist] New signup:", payload);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
