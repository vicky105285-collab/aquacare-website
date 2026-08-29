/**
 * On Vercel (where Neon injects DATABASE_URL / DATABASE_URL_UNPOOLED):
 *   1. `prisma migrate deploy`  — apply pending migrations (fatal on failure)
 *   2. `prisma db seed`         — insert-only seed of the static blog articles
 *                                 (non-fatal: the site works without it)
 *
 * Local `npm run build` has no DB credentials, so both steps skip cleanly.
 */
import { execSync } from "node:child_process";

const hasDb = Boolean(process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED);

if (!hasDb) {
  console.log("[deploy-migrate] No DATABASE_URL — skipping migrate + seed (local build).");
  process.exit(0);
}

console.log("[deploy-migrate] Applying pending migrations with `prisma migrate deploy`…");
execSync("npx prisma migrate deploy", { stdio: "inherit" });
console.log("[deploy-migrate] Migrations up to date.");

try {
  console.log("[deploy-migrate] Seeding (insert-only)…");
  execSync("npx prisma db seed", { stdio: "inherit" });
} catch (e) {
  console.warn("[deploy-migrate] Seed step failed (non-fatal):", e.message);
}
