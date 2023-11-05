import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database Connected 🚀...");
  } catch (error) {
    console.error("Error in connecting the database. ⚠", error);
  }
})();
export default prisma;
