# Nason Solar Knowledge Base

This folder contains the knowledge base for the Nason Solar AI chatbot. The chatbot references these files to provide accurate, up-to-date answers.

## How to Update

1. Go to this folder on GitHub: `src/knowledge/en/` (English) or `src/knowledge/zh/` (Chinese)
2. Click the file you want to edit
3. Click the pencil icon (Edit) in the top right
4. Make your changes
5. Click "Commit changes" at the bottom
6. The website will automatically redeploy with the updated information

## File Format

Each file uses this format:

```markdown
---
title: Your Title Here
keywords: keyword1, keyword2, keyword3
alwaysInclude: false
---

Your content here...
```

- **title**: Display name for the knowledge section
- **keywords**: Comma-separated words that trigger this knowledge. When a user's question contains any of these keywords, this file's content is included in the chatbot's context. Include both English AND Chinese keywords for better matching.
- **alwaysInclude**: Set to `true` for information that should always be available (like company info). Set to `false` for topic-specific information.

## Current Files

| File | Topic | Always Included? |
|------|-------|-----------------|
| `company.md` | Company info, contact, services | Yes |
| `incentives.md` | Federal/state tax credits, SGIP | No |
| `nem3.md` | NEM 3.0 net metering policy | No |
| `pricing.md` | System pricing guide | No |
| `financing.md` | Loans, leases, PPA, PACE | No |
| `battery-storage.md` | Tesla Powerwall, Enphase IQ | No |
| `ev-charger.md` | EV charger installation | No |
| `process.md` | Installation process & timeline | No |

## Tips

- Keep content factual and concise
- Update pricing when it changes
- Update policy info when new regulations take effect
- Both `en/` and `zh/` folders should have the same files with matching content
