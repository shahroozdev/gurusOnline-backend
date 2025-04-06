import { PrismaClient } from '@prisma/client';
import { courses, rolesList, users } from '../common/data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  for (const role of rolesList) {
    await prisma.role.upsert({
      where:{name:role.name},
      update:{},
      create: role });
  }
  for (const user of users) {
    const hashed = await bcrypt.hash(user.hash, 10);
    await prisma.user.upsert({ 
      where:{username: user.username},
      update:{},
      create: {...user, hash:hashed} });
  }

  for(const course of courses)
    await prisma.course.upsert({
      where:{title:course.title},
      update:{},
      create:course})
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
