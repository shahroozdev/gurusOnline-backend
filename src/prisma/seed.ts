import { PrismaClient } from '@prisma/client';
import { rolesList } from '../common/data';

const prisma = new PrismaClient();

async function main() {
  for (const role of rolesList) {
    await prisma.role.create({ data: role });
  }
}
main()
  .then(() => console.log('Seeding completed.'))
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
