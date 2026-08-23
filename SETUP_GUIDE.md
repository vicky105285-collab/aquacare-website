# 🚀 Developer Setup & Vercel Deployment Guide

## 1. Environment Variables (`.env`)

Add the following environment variables to your deployment environment (Vercel / local `.env`):

```env
# PostgreSQL Database Connection (Supabase, Neon, Railway, or Aiven)
DATABASE_URL="postgresql://postgres:password@localhost:5432/yuvanthika_db?schema=public"

# Admin JWT Secret for Cookie Signing
ADMIN_JWT_SECRET="yuvanthika-super-secret-key-2026-karur-tamil-nadu"

# Domain URL
NEXT_PUBLIC_SITE_URL="https://yuvanthikaaquasolar.in"
```

---

## 2. Prisma Database Setup & Seed

Run the following commands to initialize PostgreSQL tables and seed the initial Super Admin user:

```bash
# Push Prisma schema to PostgreSQL
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed Super Admin and default Site Settings
node scripts/seed-admin.js
```

---

## 3. Local Development

```bash
npm run dev
```

Visit:
- Website: `http://localhost:3000`
- Admin Portal: `http://localhost:3000/admin/login`

---

## 4. Vercel Production Deployment

1. Import project into Vercel.
2. Add `DATABASE_URL` and `ADMIN_JWT_SECRET` in Vercel Project Settings ➔ Environment Variables.
3. Build Command: `prisma generate && next build`
4. Output Directory: `.next`
