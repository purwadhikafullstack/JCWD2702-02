import { prisma } from '@/lib/PrismaClient';

export const findUserByIdService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });
};

export const createUserPasswordInfoService = async ({
  uid,
  date,
}: {
  uid: string;
  date: any;
}) => {
  return await prisma.$transaction(async (tx) => {
    const findUserResetPasswordInfo = await tx.user_Reset_Password.findFirst({
      where: {
        userId: uid,
      },
    });

    await tx.user_Reset_Password.delete({
      where: {
        id: findUserResetPasswordInfo?.id,
        userId: uid,
      },
    });

    const createUserPasswordInfo = await prisma.user_Reset_Password.create({
      data: {
        userId: uid,
        expireIn: date,
      },
    });

    return createUserPasswordInfo;
  });
};

export const findUserResetPasswordInfoService = async ({
  uid,
}: {
  uid: string;
}) => {
  return await prisma.user_Reset_Password.findFirst({
    where: {
      userId: uid,
    },
  });
};
