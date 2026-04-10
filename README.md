# Nason Solar Website

Bilingual (EN/ZH) marketing site for Nason Solar with an AI chatbot powered by Gemini. Built with Next.js 16 and deployed on Vercel.

## Development

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build
```

Required env var: `GOOGLE_API_KEY` (Gemini API key) in `.env.local`.

## Chatbot Knowledge Base

The chatbot references a Markdown-based knowledge base to keep answers accurate and up-to-date (solar policies, pricing, incentives). It lives in `src/knowledge/` with separate `en/` and `zh/` folders.

### How it works

1. When a user sends a message, the chatbot scans the text for keywords
2. Matching knowledge files get injected into the AI's context
3. `company.md` is always included (basic company info)
4. The AI answers using the knowledge base as its source of truth

### How to update the knowledge base

The easiest way is through GitHub's web editor — no coding required:

1. Go to [`src/knowledge/en/`](src/knowledge/en) (English) or [`src/knowledge/zh/`](src/knowledge/zh) (Chinese) on GitHub
2. Click the file you want to edit (e.g., `pricing.md`, `incentives.md`)
3. Click the pencil icon (Edit)
4. Make your changes and click "Commit changes"
5. Vercel will auto-deploy the update in ~1 minute

### Knowledge file format

```markdown
---
title: Your Topic Title
keywords: keyword1, keyword2, 关键词1, 关键词2
alwaysInclude: false
---

Your content in Markdown...
```

- **keywords** — comma-separated trigger words. If a user message contains any keyword, this file gets loaded. Include EN + ZH keywords for best matching.
- **alwaysInclude** — set to `true` only for files that should always be in context (e.g., company info).

### Current knowledge files

| File | Topic |
|------|-------|
| `company.md` | Company info, contact, services (always included) |
| `incentives.md` | Federal ITC, California SGIP, tax credits |
| `nem3.md` | NEM 3.0 net metering policy |
| `pricing.md` | System pricing guide |
| `financing.md` | Loans, leases, PPA, PACE |
| `battery-storage.md` | Tesla Powerwall, Enphase IQ batteries |
| `ev-charger.md` | EV charger installation |
| `process.md` | Installation process & timeline |

### Important

- **Both `en/` and `zh/` must be kept in sync.** If you update a fact in English, update the Chinese version too.
- **Policy changes often** — review `incentives.md`, `nem3.md`, and `pricing.md` every few months.
- See [`src/knowledge/README.md`](src/knowledge/README.md) for the detailed editing guide.

## Project Structure

- `src/app/` — Next.js App Router pages and API routes
- `src/components/` — React components (Hero, Navbar, ChatBot, etc.)
- `src/knowledge/` — Chatbot knowledge base (Markdown)
- `src/i18n/` — Bilingual translations (EN/ZH)
- `src/lib/knowledge.ts` — Knowledge loader (keyword matching)
- `src/app/api/chat/route.ts` — Gemini chat API endpoint
