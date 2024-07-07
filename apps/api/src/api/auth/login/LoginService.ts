import { prisma } from './../../../lib/PrismaClient';

export const userLoginByEmailService = async ({ email }: { email: string }) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
