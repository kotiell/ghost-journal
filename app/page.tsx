
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

  const ghostTests = await prisma.ghostTest.findMany({
    include: {
      ghost: true,
    },
  })


  return (
    <div className="container mx-auto">
      <JournalContent
        tests={JSON.stringify(ghostTests)}
        ghosts={JSON.stringify(ghostsWithEvidence)}
        evidence={JSON.stringify(evidenceWithGhosts)}
      />
    </div>
  )
}