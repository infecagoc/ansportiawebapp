# ANSPORTIA — Developer Skills & Workflows

A quick reference for working in this monorepo (npm workspaces).

## Layout

```
ansportiawebapp/
├── backend/          NestJS + Prisma + Supabase Storage  (API on :4000)
├── frontend/         Next.js 15 (Pages Router) + Tailwind (web on :3000)
├── packages/shared/  Shared enums/types
├── .mcp.json         Playwright MCP server
└── SKILLS.md         (this file)
```

## First-time setup

```bash
npm install                         # installs all workspaces
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Fill in Supabase URL, keys, DATABASE_URL, SUPABASE_JWT_SECRET

# Create the storage bucket + RLS (Supabase SQL editor):
#   backend/prisma/supabase-storage-setup.sql

npm run prisma:generate
npm run prisma:migrate              # creates tables in Supabase Postgres
```

## Everyday commands (run from repo root)

| Command | Does |
|---|---|
| `npm run dev` | Run web + api together |
| `npm run dev:web` | Frontend only (:3000) |
| `npm run dev:api` | Backend only (:4000) |
| `npm run build` | Build all workspaces |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |
| `npm run prisma:migrate` | Create/apply a migration |

## Testing (e2e — Playwright)

```bash
cd frontend
npm run test:e2e:install     # one-time: download browsers
npm run test:e2e             # runs e2e/*.spec.ts (auto-starts dev server)
```

## Playwright MCP

`.mcp.json` registers the official Playwright MCP server (`@playwright/mcp`),
which lets an AI agent drive a real browser (navigate, click, screenshot, assert)
against the running app. The agent picks it up automatically when working in this
repo — no extra setup beyond `npm install`.

## Storage (Supabase, replaces Cloudflare R2)

- One **private** bucket: `ansportia-documents`.
- All access goes through `backend/src/storage/storage.service.ts`.
- DB stores object **paths**; downloads use short-lived **signed URLs**.
- Swapping to Backblaze B2 / R2 later changes only that one file.

## Auth & roles

- Login via Supabase Auth on the frontend (`/auth/login`).
- Backend verifies the Supabase JWT (`JwtAuthGuard`) using `SUPABASE_JWT_SECRET`.
- Restrict routes with `@Roles(UserRole.SUPER_ADMIN)` + `RolesGuard`.

## API surface

`/api/v1/{health, auth, users, customers, suppliers, products, orders,
expenses, customer-payments, supplier-payments, documents, reports, dashboard}`
