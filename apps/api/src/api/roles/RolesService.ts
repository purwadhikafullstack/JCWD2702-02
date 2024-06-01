import { prisma } from './../../lib/PrismaClient';

export const getRolesService = async () => {
  return await prisma.role.findMany();
};
