
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import JournalContent from "@/components/JournalContent";

export default async function Journal() {

  const ghostsWithEvidence = await prisma.ghost.findMany({
    include: {
      evidence: true,
    },
  });

  const evidenceWithGhosts = await prisma.evidence.findMany({
    include: {
      ghosts: true,
    },
  });



  return (
    <div className="container mx-auto">
      <JournalContent ghosts={JSON.stringify(ghostsWithEvidence)} evidence={JSON.stringify(evidenceWithGhosts)} />
    </div>
  )

}