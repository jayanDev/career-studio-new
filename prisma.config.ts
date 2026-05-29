import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // `prisma generate` runs on postinstall (incl. Vercel's build) and does
    // not open a connection, but loading this config eagerly resolves the
    // datasource URL. Fall back to a non-connecting placeholder so generate
    // never fails when DATABASE_URL isn't injected yet. Real CLI commands
    // (migrate / studio / db) pick up the actual value from the environment.
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
