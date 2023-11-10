import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('database is connected successfully');
  } catch (error) {
    console.error('error in connecting the database', error);
  }
})();
export default prisma;
