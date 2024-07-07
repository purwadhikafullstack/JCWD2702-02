// import { prisma } from './../src/lib/PrismaClient';
// import { HashingPassword } from './../src/helpers/HashingPassword';

// const dataCategories = [
//   {
//     name: 'Desks',
//   },
//   {
//     name: 'Chairs',
//   },
//   {
//     name: 'Couches',
//   },
//   {
//     name: 'Boxes',
//   },
//   {
//     name: 'Drawers',
//   },
//   {
//     name: 'Cabinets',
//   },
//   {
//     name: 'Bins',
//   },
//   {
//     name: 'Lamps',
//   },
// ];

// const main = async () => {
//   await prisma.$transaction(async (tx) => {
//     for (let item of dataCategories) {
//       await tx.category.create({
//         data: item,
//       });
//     }

//     await tx.role.createMany({
//       data: [
//         {
//           name: 'Super Admin',
//         },
//         {
//           name: 'Warehouse Admin',
//         },
//         {
//           name: 'User',
//         },
//       ],
//     });

//     await tx.user.createMany({
//       data: [
//         {
//           fullname: 'Alpha Test',
//           email: 'alpha@test.com',
//           verify: 'VERIFIED',
//           password: await HashingPassword({ password: 'test1234' }),
//         },
//         {
//           fullname: 'Beta Test',
//           email: 'beta@test.com',
//           verify: 'VERIFIED',
//           password: await HashingPassword({ password: 'test1234' }),
//         },
//         {
//           fullname: 'Gamma Test',
//           email: 'gamma@test.com',
//           verify: 'VERIFIED',
//           password: await HashingPassword({ password: 'test1234' }),
//         },
//         {
//           fullname: 'Charlie Test',
//           email: 'charlie@test.com',
//         },
//       ],
//     });

//     await tx.warehouse.createMany({
//       data: [
//         {
//           name: 'Gudang SAFE n LOCK',
//           province: 'JAWA TIMUR',
//           city: 'KABUPATEN SIDOARJO',
//           detail:
//             'SAFE n LOCK, Jl. Lkr. Timur No.5,5, Rangkah Kidul, Kec. Sidoarjo Kabupaten Sidoarjo Jawa Timur 61234',
//           postalCode: '61234',
//           longitude: -7.440434,
//           latitude: 12.71701,
//         },
//         {
//           name: 'Sentral Singosari Malang',
//           province: 'JAWA TIMUR',
//           city: 'KABUPATEN MALANG',
//           detail:
//             '4MGM+JXH, jl Yonkav, Krajan, Randuangung, Kec. Singosari, Kabupaten Malang, Jawa Timur 65153',
//           postalCode: '65153',
//           longitude: -7.873365856727534,
//           latitude: 112.68506884194159,
//         },
//       ],
//     });

//     await tx.admin.createMany({
//       data: [
//         {
//           adminRole: 1,
//           fullname: 'Super Admin',
//           email: 'super@admin.com',
//           password: await HashingPassword({ password: 'admin123' }),
//         },
//         {
//           adminRole: 2,
//           fullname: 'Warehouse Admin 1',
//           email: 'admin1@admin.com',
//           password: await HashingPassword({ password: 'admin123' }),
//         },
//         {
//           adminRole: 2,
//           fullname: 'Warehouse Admin 2',
//           email: 'admin2@admin.com',
//           password: await HashingPassword({ password: 'admin123' }),
//         },
//       ],
//     });
//   });
// };

// main()
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
