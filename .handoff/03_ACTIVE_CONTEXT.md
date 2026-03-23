# Active Context — NECYPAA XXXVI Website

> **Last Updated:** 2026-03-23
> **Purpose:** Snapshot of exactly where this project stands right now. Updated before every push.

---

## Current Project State

**Phase:** Content filling + polish. Core infrastructure is complete. Convention is Dec 31, 2026.

**Branch:** `main`
**Build status:** Passing (lint, type check, 45 unit tests, production build all green)
**Deployment:** Live at https://www.necypaact.com via Vercel auto-deploy

---

## Latest Changes (This Session — 2026-03-23)

### Enterprise Audit & Professionalization

1. **Codebase deslopping** — Removed duplicate `BreakfastAttendee` interface in `actions/breakfast.ts` (now imports from `lib/types.ts`). Added JSDoc to all 4 server action functions, all exported interfaces in `lib/types.ts`, and `calculateProcessingFee()`. Fixed stale "Next.js 14" reference in `CONTRIBUTING.md` (it's Next.js 15).

2. **Language switcher fix** — `components/language-switcher.tsx` now uses next-intl's `useRouter` to actually navigate between `/en/` and `/es/` routes. Previously was a visual-only placeholder with a TODO.

3. **New unit tests (15 added)** — `lib/__tests__/issuer-client.test.ts` (8 tests: code masking, HTTP error codes, network failures, request verification) and `lib/__tests__/accessibility-context.test.ts` (4 tests: provider defaults, updates, reset, error boundary). Total now 45 tests.

4. **Testing infrastructure** — Added `@testing-library/react`, `jsdom`, `@testing-library/jest-dom` as dev dependencies. Updated `vitest.config.ts` with `@vitejs/plugin-react` for JSX support and `e2e/` exclusion.

5. **Documentation suite** — Created `README.md` (was missing), `docs/architecture.md`, `docs/onboarding.md`, `docs/testing.md`, `docs/tech-debt-and-gaps.md`.

6. **Emergency Handoff Protocol** — Created `.handoff/` directory with system architecture, operations, and this active context file. Cross-agent rules and pre-push hook enforcer.

---

## Recent Commits (Pre-Session)

```
4c0117d feat(events): populate past events + redesign homepage section
3bf7aa5 fix(meta): use badge image for social sharing preview
fdf3e5c refactor(states): tabbed layout to prevent resource burial
861bc77 fix(meetings): replace unicode escape sequences with actual characters
dabf354 fix(meetings): handle empty city/day/time in meeting cards gracefully
9d64cbf feat(meetings): integrate YPAA + Young Persons Al-Anon meeting directories
22a4200 style: comprehensive UX/UI design overhaul
```

---

## Features: Complete vs In-Progress vs Placeholder

### Complete (Real Content + Functionality)
- Homepage (hero, quick facts, CTA, YPAA narrative, events preview, meetings)
- Registration (3-step flow: info → policy → Stripe checkout)
- Breakfast tickets (standalone Stripe checkout)
- Free/cash registration (Stripe customer record)
- Access code redemption (issuer service integration)
- FAQ page (CMS-backed)
- Events page (upcoming + past events)
- Blog (index + detail pages — uses static data, CMS integration pending)
- States/meeting directory (interactive map + 13 states + DC)
- Al-Anon resources page
- Accessibility statement + 6-mode panel
- Bilingual support (EN/ES with next-intl routing)
- Anonymous feedback form

### Placeholder Pages (PageShell "Coming Soon")
- `/bid` — How to bid for next convention
- `/program` — Convention program/schedule
- `/merch` — Merchandise
- `/prayer` — Prayer/meditation
- `/asl` — ASL resources
- `/service` — Service committee opportunities

---

## Known Critical Bugs

**None currently.** Last bug fix was `4c0117d` (past events rendering).

---

## Known Critical Gaps (P0 — Fix Before Launch)

1. **No Stripe webhook handler** — If a user closes browser mid-checkout, payment succeeds on Stripe but the site has no record. Need `app/api/webhooks/stripe/route.ts`.

2. **No persistent registration storage** — Registrations exist only as Stripe customer metadata. Need a `Registrations` Payload CMS collection.

3. **Rate limiter is per-instance** — In-memory `Map` resets on Vercel cold starts. Replace with Vercel KV for production.

See `docs/tech-debt-and-gaps.md` for the full prioritized list (20 items, P0–P3).

---

## Active Dependencies on External Systems

| System | Status | Notes |
|--------|--------|-------|
| **Stripe** | Active (test mode for dev, live for prod) | Keys in Vercel env vars |
| **Issuer Service** | Optional | Only needed for access code flow |
| **Vercel** | Active | Auto-deploy on `main` |
| **Google Fonts** | Active | Loaded via `<link>` in layout |

---

## What a New Developer Should Do First

1. Read `AA_TRADITIONS_GUARDRAILS.md` — The rules about anonymity and tone are non-negotiable.
2. Read `ACCESSIBILITY_GUIDELINES.md` — Every component must be WCAG 2.1 AA minimum.
3. Follow `docs/onboarding.md` for environment setup.
4. Read `docs/architecture.md` for how the system fits together.
5. Run `pnpm dev`, `pnpm test`, `pnpm build` to verify your setup.
6. Check `docs/tech-debt-and-gaps.md` for the highest-priority work items.
