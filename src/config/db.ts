import { PrismaClient } from "@prisma/client";

export class DatabaseManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async disconnect(): Promise<void> {
    return this.prisma.$disconnect();
  }
}
