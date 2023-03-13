import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getEvidence() {
  const evidenceWithGhosts = await prisma.evidence.findMany({
    include: {
      ghosts: true,
    },
  });
  return evidenceWithGhosts;
}
