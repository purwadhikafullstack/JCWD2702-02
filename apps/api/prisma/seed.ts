import { prisma } from './../src/lib/PrismaClient';

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.role.createMany({
      data: [
        {
          name: 'Super Admin',
        },
        {
          name: 'Warehouse Admin',
        },
        {
          name: 'User',
        },
      ],
    });
  });
};

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
