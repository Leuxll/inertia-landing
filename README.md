This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Pre-Deploy Guard (Waitlist Smoke Test)

Run this before deploying to verify real waitlist signup works end-to-end:

```bash
pnpm deploy:guard
```

Requirements:
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `RESEND_FROM_EMAIL`
- `WAITLIST_SMOKE_EMAIL` (a stable test email)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

The command builds the app, starts it locally, then posts to `/api/waitlist`. It fails fast if signup is broken.

## GitHub Actions Deploy Gate

This repo includes `/Users/yuefunglee/Documents/inertia-landing/.github/workflows/deploy-guard.yml` with:
- `Quality Checks` (type-check + build)
- `Waitlist Smoke` (real signup smoke test against your configured Resend audience)

Required repository secrets:
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`
- `RESEND_FROM_EMAIL`
- `WAITLIST_SMOKE_EMAIL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Recommended repo settings:
1. Enable branch protection on `main`
2. Require status checks:
   - `Quality Checks`
   - `Waitlist Smoke`
3. Disable direct pushes to `main` (PR-only merges)

## Security Configuration

For production deployments:
- Configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for distributed API rate limiting.
- Set `HEALTHCHECK_TOKEN` and include it as `x-healthcheck-token` when calling `/api/health`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
