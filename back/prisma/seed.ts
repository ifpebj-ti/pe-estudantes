import { PrismaClient } from '@prisma/client';

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

  const phases = [
    { name: 'Triagem' },
  ]

  for (const phase of phases) {
    await prisma.currentPhases.upsert({
      where: { name: phase.name },
      update: {},
      create: phase,
    });
  }

  console.log('Seed concluída');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
