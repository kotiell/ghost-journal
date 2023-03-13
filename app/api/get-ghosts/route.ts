import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getGhosts() {
  const ghostsWithEvidence = await prisma.ghost.findMany({
    include: {
      evidence: true,
    },
  });
  return ghostsWithEvidence;
}
