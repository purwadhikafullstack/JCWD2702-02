import { prisma } from './../src/lib/PrismaClient';
import { HashingPassword } from './../src/helpers/HashingPassword';

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

    await tx.user.createMany({
      data: [
        {
          fullname: 'Alpha Test',
          email: 'alpha@test.com',
          verify: 'VERIFIED',
          password: await HashingPassword({ password: 'test1234' }),
        },
        {
          fullname: 'Beta Test',
          email: 'beta@test.com',
          verify: 'VERIFIED',
          password: await HashingPassword({ password: 'test1234' }),
        },
        {
          fullname: 'Gamma Test',
          email: 'gamma@test.com',
          verify: 'VERIFIED',
          password: await HashingPassword({ password: 'test1234' }),
        },
        {
          fullname: 'Charlie Test',
          email: 'charlie@test.com',
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
