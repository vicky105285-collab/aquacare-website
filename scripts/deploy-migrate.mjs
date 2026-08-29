/**
 * Runs `prisma migrate deploy` only when a database URL is present
 * (i.e. on Vercel, where Neon injects DATABASE_URL / DATABASE_URL_UNPOOLED).
 *
 * Local `npm run build` has no DB credentials, so it skips cleanly instead of
 * failing. A genuine migration failure on Vercel still aborts the build.
 */
import { execSync } from "node:child_process";

const hasDb = Boolean(process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED);

if (!hasDb) {
  console.log("[deploy-migrate] No DATABASE_URL — skipping `prisma migrate deploy` (local build).");
  process.exit(0);
}

console.log("[deploy-migrate] Applying pending migrations with `prisma migrate deploy`…");
execSync("npx prisma migrate deploy", { stdio: "inherit" });
console.log("[deploy-migrate] Migrations up to date.");
