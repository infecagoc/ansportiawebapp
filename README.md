# ANSPORTIA — Trading Management System

Cloud-based Trading Management System for managing imports, exports, customer
orders, supplier purchases, payments, expenses, outstanding balances, documents
and profitability (Nepal–China trade).

## Monorepo layout

```text
ansportiawebapp/
├── backend/          # NestJS + Prisma + Supabase Storage (API)
├── frontend/         # Next.js 15 + TS + Tailwind (web)
├── packages/
│   └── shared/       # Shared enums / types across web & api
├── .env.example      # Copy to .env and fill in
├── tsconfig.base.json
└── package.json      # npm workspaces root
```

## Tech stack

| Layer    | Choice                                                        |
|----------|---------------------------------------------------------------|
| Frontend | Next.js 15, TypeScript, Tailwind, Zustand, React Hook Form, Zod, Recharts, Axios |
| Backend  | NestJS, TypeScript, Prisma, JWT, bcrypt, class-validator      |
| Database | PostgreSQL (Supabase)                                         |
| Auth     | Supabase Auth                                                 |
| Storage  | **Supabase Storage** (free tier — replaces Cloudflare R2)     |
| Hosting  | Vercel (web) · Render (api) · Supabase (db + storage)         |

## Storage — Supabase Storage (free, no Cloudflare)

We use a **single private bucket** `ansportia-documents`. The backend uses the
Supabase **service-role key** to upload/delete and to mint **short-lived signed
URLs**. The DB stores the object **path** (not a public URL), so financial
documents stay private.

```text
ansportia-documents/   (PRIVATE bucket)
├── orders/{orderId}/invoices/...
├── orders/{orderId}/packing-lists/...
├── orders/{orderId}/payment-proofs/...
├── orders/{orderId}/shipping/...
├── orders/{orderId}/customs/...
├── customers/{customerId}/...
├── suppliers/{supplierId}/...
└── misc/...
```

All storage access is funnelled through `backend/src/storage/storage.service.ts`.
Swapping to Backblaze B2 / R2 later means changing only that one file.

## Getting started

```bash
# 1. Install everything (npm workspaces)
npm install

# 2. Configure environment
cp .env.example .env        # then fill in Supabase + DB values

# 3. Create the Supabase bucket + RLS
#    Run backend/prisma/supabase-storage-setup.sql in the Supabase SQL editor

# 4. Generate Prisma client + run migrations
npm run prisma:generate
npm run prisma:migrate

# 5. Run both apps
npm run dev          # web on :3600, api on :4000
# or individually:
npm run dev:web
npm run dev:api
```

## API surface (v1)

```text
/api/v1/health
/api/v1/documents      # upload / download (signed URL) / list / delete  [scaffolded]
/api/v1/auth           # TODO Phase 1
/api/v1/users          # TODO
/api/v1/customers      # TODO
/api/v1/suppliers      # TODO
/api/v1/products       # TODO
/api/v1/orders         # TODO
/api/v1/order-items    # TODO
/api/v1/expenses       # TODO
/api/v1/customer-payments  # TODO
/api/v1/supplier-payments  # TODO
/api/v1/reports        # TODO
/api/v1/dashboard      # TODO
```

## Phase 1 MVP

Landing Page · Authentication · Dashboard · Customers · Suppliers · Orders ·
Expenses · Customer Payments · Supplier Payments · Documents · Reports · Settings

## Phase 2 (future)

Customer Portal · Inventory · Shipment Tracking · Multi-Currency · WhatsApp/Email
notifications · PDF invoice generation · Mobile app · AI analytics
