# Intake

A multi-step vehicle registration and payment system for car shows. One submission, up to five vehicles, embedded payment — no redirects.

---

## Background

Inspired by a real client project that used Wix Forms for a truck show registration. It worked, but two things broke the experience: no multi-vehicle entries, and a payment redirect that killed conversions. Intake is the rebuild with full control over both.

---

## How It Works

**Step 1 — Contact Info**
Organizer details. Supports individual registrants and org representatives submitting for a group.

**Step 2 — Vehicle Entries**
Add up to five vehicles. Each entry takes make, model, year, nickname, license plate, and judging category. License plate is used as a unique identifier — no duplicate entries, one vehicle per judging category.

**Step 3 — Review**
Full summary before payment. Edit or delete entries from this page. Deleting all vehicles bounces you back to Step 2.

**Step 4 — Payment**
Embedded Stripe form, inline. Total is calculated by number of vehicles × base registration fee.

A step indicator lives at the top of the form throughout so users always know where they are.

---

## Tech Stack

| | |
|---|---|
| Next.js | Framework |
| React Context API | Form state |
| Zod | Validation |
| Stripe.js + Server Actions | Embedded payment |
| shadcn/ui + Tailwind | UI |

---

## Status

**Frontend MVP is complete.** Full form flow works end-to-end with Stripe in test mode.

**Backend is planned, not yet built.** Supabase (PostgreSQL) will handle form submissions in a `pending` state, with a Stripe webhook flipping status to `confirmed` on payment completion.

---

## Next Steps

- [ ] Supabase integration
- [ ] Stripe webhook handler
- [ ] UI redesign for the car enthusiast audience

---

> **Intake** — named for what the form does, and what's under the hood.
