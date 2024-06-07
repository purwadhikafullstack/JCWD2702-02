import { prisma } from '@/lib/PrismaClient';
import { IReqUpdatePasswordServiceParams } from './AuthTypes';

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

    const createUserPasswordInfo = await tx.user_Reset_Password.create({
      data: {
        userId: uid,
        expireIn: date,
      },
    });

    if (findUserResetPasswordInfo) {
      await tx.user_Reset_Password.delete({
        where: {
          id: findUserResetPasswordInfo?.id,
          userId: uid,
        },
      });
    }

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

export const updatePasswordService = async ({
  uid,
  password,
}: IReqUpdatePasswordServiceParams) => {
  return await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      password: password,
    },
  });
};

export const findUserEmailVerificationInfoService = async ({
  uid,
}: {
  uid: string;
}) => {
  return await prisma.user_Email_Verification.findFirst({
    where: {
      userId: uid,
    },
  });
};

export const createUserEmailVerificationInfoService = async ({
  uid,
  date,
}: {
  uid: string;
  date: any;
}) => {
  return await prisma.$transaction(async (tx) => {
    const findUserEmailVerificationInfo =
      await tx.user_Email_Verification.findFirst({
        where: {
          userId: uid,
        },
      });

    const createUserVerificationInfo = await tx.user_Email_Verification.create({
      data: {
        userId: uid,
        expireIn: date,
      },
    });

    if (findUserEmailVerificationInfo) {
      await tx.user_Email_Verification.delete({
        where: {
          id: findUserEmailVerificationInfo.id,
        },
      });
    }

    return createUserVerificationInfo;
  });
};

export const updateUserEmailService = async ({
  uid,
  email,
}: {
  uid: string;
  email: string;
}) => {
  return await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      email: email,
    },
  });
};
