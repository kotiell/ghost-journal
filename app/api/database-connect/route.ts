import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const ghostsWithEvidence = await prisma.ghost.findMany({
    include: {
      evidence: true,
    },
  });
  return NextResponse.json(ghostsWithEvidence);
}


