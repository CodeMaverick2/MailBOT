# MailBOT Landing Page

Production-ready Next.js landing page for MailBOT.

## Quick start

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Public site URL for SEO, sitemap, Open Graph |
| `WAITLIST_WEBHOOK_URL` | No | Webhook to forward waitlist signups (Zapier, Slack, etc.) |
| `WAITLIST_WEBHOOK_SECRET` | No | Shared secret sent as `X-Webhook-Secret` header |
| `PORT` | No | Server port (default `3000`) |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (run after build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run prod:check` | Lint + typecheck + build (CI gate) |

## Production deployment

### Option 1: Node.js (standalone)

```bash
npm run prod:check
NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run start
```

The build outputs a standalone server in `.next/standalone/`.

### Option 2: Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  -t mailbot-landing \
  ./frontend

docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  -e WAITLIST_WEBHOOK_URL=https://hooks.zapier.com/... \
  mailbot-landing
```

### Option 3: Vercel

1. Import the repo and set root directory to `frontend`
2. Set `NEXT_PUBLIC_SITE_URL` to your production domain
3. Optionally set `WAITLIST_WEBHOOK_URL` for form submissions
4. Deploy

## Waitlist API

`POST /api/waitlist`

```json
{
  "email": "you@company.com",
  "company": "Acme Corp"
}
```

- Validates email format
- Rate limited to 1 request per IP per minute
- Forwards to `WAITLIST_WEBHOOK_URL` if configured
- Logs signups in development when no webhook is set

## Project structure

```
frontend/
├── src/
│   ├── app/           # Next.js App Router (pages, API, SEO)
│   ├── components/    # UI components
│   └── lib/           # Site config, env validation
├── public/            # Static assets
├── Dockerfile         # Container deployment
└── .env.example       # Environment template
```

## Security

- Security headers (X-Frame-Options, CSP-adjacent policies)
- `poweredByHeader` disabled
- Input validation with Zod
- Rate limiting on waitlist endpoint
- No secrets in client bundle
