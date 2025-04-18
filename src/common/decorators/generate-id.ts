import { PrismaClient } from "@prisma/client";

// identity-generator.util.ts
export async function generateIdentity(
    prisma: PrismaClient,
    initial: string,
  ): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const userCount = await prisma.user.count();
    const qty = (userCount + 1).toString().padStart(3, '0'); // e.g. 045
    return `${initial}${year}${month}${qty}`;
  }