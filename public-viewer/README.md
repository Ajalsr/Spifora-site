# Spifora Public Viewer

Standalone, unauthenticated pages for the links Spifora emails to customers
and vendors — invoice, quote, bill, letter. Nothing here requires login;
each page fetches one document by its public token from the real backend.

This is **not** the full Erp app. The full app (dashboard, all modules) is
a Tauri desktop app and isn't meant to be a public website. This project
exists only because customers clicking an emailed link won't have that
desktop app installed — they need something that opens in a plain browser.

## Routes

Must stay in sync with `Erp/backend/utils/email.go` — those functions build
the links this app has to serve:

| Route | Matches email.go |
|---|---|
| `/invoice/public/:token` | `SendInvoiceEmail` |
| `/quote/public/:token` | `SendQuoteEmail` |
| `/bill/public/:token` | (vendor bill email) |
| `/letter/public/:token` | (letter email) |

If those backend link patterns ever change, update `src/App.jsx` here too —
there's no shared source of truth between the two repos.

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to the real backend
npm run dev
```

## Deploy

Recommended: its own subdomain (e.g. `view.spifora.com` or `link.spifora.com`),
**separate** from `spifora.com` itself (the static marketing site in the
parent `Spifora-site/` folder). Keeping it on its own subdomain avoids any
routing collision with the static `index.html`/`spifora.html` at the domain
root — no rewrite rules needed to keep the two from fighting over the same
paths.

After deploying, set `Erp/backend`'s `PUBLIC_VIEWER_URL` env var (separate
from `APP_URL`, which stays pointed at the marketing/download site for the
invitation-email link) to this app's real URL (e.g. `https://view.spifora.com`)
— that's what gets stitched into every invoice/quote/bill/letter link going
forward.

**CORS**: this app calls the backend from a different origin than `APP_URL`
(its own subdomain), so it needs to be added to the backend's
`ALLOWED_ORIGINS` env var too — `APP_URL` alone does not cover it. Without
this, every fetch here gets rejected with 403 and every page shows "not found
or has expired" even for a perfectly valid token.

`vercel.json` is included for a Vercel deploy (SPA fallback rewrite, needed
so `/invoice/public/xyz` doesn't 404 on a hard refresh). Any static host with
client-side-routing fallback support works the same way (Netlify, nginx
`try_files`, etc).
