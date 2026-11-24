import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Query logging only in development — in production it leaks every query
// (with parameter values) to stdout and slows the server down.
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['query'],
  })

// Cache on globalThis unconditionally (standard Next.js pattern) so hot
// reloads in dev AND module re-instantiation in serverless/edge environments
// always reuse the same client instead of opening new connection pools.
globalForPrisma.prisma = db
