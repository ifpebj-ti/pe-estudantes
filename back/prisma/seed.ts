import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const levels = [
    { name: 'Administrador' },
    { name: 'Estudante/Família' },
    { name: 'Profissional da Educação' },
    { name: 'Profissional da Saúde' },
    { name: 'Professor' }
  ];

  for (const level of levels) {
    await prisma.level.upsert({
      where: { name: level.name },
      update: {},
      create: level,
    });
  }

  console.log('Seed concluída: 5 níveis de acesso adicionados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
