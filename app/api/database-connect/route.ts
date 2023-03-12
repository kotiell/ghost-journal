import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = await prisma.ghost.findFirst();