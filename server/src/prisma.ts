import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'], // exige no log da aplicação os comandos executados (sql)
});