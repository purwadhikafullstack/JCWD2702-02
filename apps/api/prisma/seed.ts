import { prisma } from './../src/lib/PrismaClient';

const dataCategories = [
  {
    name: 'Desks',
  },
  {
    name: 'Chairs',
  },
  {
    name: 'Couches',
  },
  {
    name: 'Boxes',
  },
  {
    name: 'Drawers',
  },
  {
    name: 'Cabinets',
  },
  {
    name: 'Bins',
  },
  {
    name: 'Lamps',
  },
];

const main = async () => {
  await prisma.$transaction(async (tx) => {
    for (let item of dataCategories) {
      await tx.category.create({
        data: item,
      });
    }

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