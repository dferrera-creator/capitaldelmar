// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
