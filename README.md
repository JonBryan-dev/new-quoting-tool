# PlumbGas Renewables — Heat Pump Survey & Quoting Site

Lead-generation site for [PlumbGas Services](https://www.plumbgas.services): free heat
loss surveys and air source heat pump quotes across Staffordshire, with the £7,500
Boiler Upgrade Scheme grant front and centre. Live at
[www.plumbgasrenewables.services](https://www.plumbgasrenewables.services).

## What the site does

- **Homepage** — heat-pump-first landing page with grant explainer, how-it-works,
  Staffordshire coverage, and booking CTAs.
- **/book** — free heat loss survey booking form (the main conversion goal). Leads are
  saved to the database and optionally emailed/Slacked to the team.
- **/quote/heatpump** — 3-question instant estimate: sizes a heat pump from property
  type/bedrooms/bathrooms and shows the price after the £7,500 grant, then pushes to
  the survey booking.
- **/quote/boiler** — original 9-step fixed-price boiler quote flow (kept as a
  secondary offering).
- **/admin** — password-protected dashboard: **Leads** (survey bookings + quote
  requests), Products, Pricing and Quiz options.

## Stack

Next.js (App Router) · React · Tailwind CSS 4 · Prisma (PostgreSQL via Prisma
Accelerate) · Zustand · deployed on Vercel.

## Environment variables (set in Vercel)

| Variable | Required | Purpose |
|---|---|---|
| `PRISMA_DATABASE_URL` (or `PRISMA_ACCELERATE_URL`) | Yes, for lead storage | Prisma Accelerate connection string |
| `JWT_SECRET` | Yes | Signs admin login cookies |
| `RESEND_API_KEY` | Optional | Emails each new lead via [Resend](https://resend.com) |
| `LEADS_EMAIL` | Optional | Where lead emails go (default `jon@plumbgas.services`) |
| `LEADS_FROM` | Optional | From address for lead emails |
| `SLACK_LEADS_WEBHOOK_URL` | Optional | Posts each new lead to a Slack channel |

## Database

After changing `prisma/schema.prisma`, push the schema (needs a direct database URL):

```bash
npm run db:push        # creates/updates tables, including SurveyBooking
npm run db:create-admin # one-off: create an admin user
```

Until `SurveyBooking` exists, the booking API automatically falls back to saving leads
in the `Quote` table, so nothing is lost.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
