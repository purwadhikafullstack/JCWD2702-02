import { prisma } from '@/lib/PrismaClient';

export const findUserByIdService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
};
