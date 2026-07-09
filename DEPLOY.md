# MailBOT

Monorepo with:
- **Backend API** — root (`src/`)
- **Landing page** — `frontend/` (Next.js)

## Vercel deployment (landing page)

In your Vercel project settings:

1. **Settings → General → Root Directory → `frontend`**
2. **Environment variables:**
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - `WAITLIST_WEBHOOK_URL` = (optional) webhook for waitlist signups
3. Redeploy

Do **not** use the repo root as the Vercel root — that builds the Express backend instead of Next.js.

See `frontend/README.md` for full deployment docs.
