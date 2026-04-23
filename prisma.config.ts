import path from 'node:path'
import { defineConfig } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: path.join(process.cwd(), 'prisma/schema.prisma'),
  migrations: {
    seed: 'npx tsx scripts/seed-admin.mjs',
  },
  datasource: {
    url: process.env.DIRECT_URL!,
  },
})
