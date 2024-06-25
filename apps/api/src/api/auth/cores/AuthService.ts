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
    const createUserPasswordInfo = await tx.user_Reset_Password.create({
      data: {
        userId: uid,
        expireIn: date,
      },
    });

    await tx.user_Reset_Password_History.create({
      data: {
        userId: uid,
        resetId: createUserPasswordInfo.id,
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
    orderBy: {
      id: 'desc',
    },
  });
};

export const expiredUserResetPasswordInfo = async ({
  uid,
  id,
}: {
  uid: string;
  id: number;
}) => {
  await prisma.$transaction(async (tx) => {
    const findUserResetPasswordInfo = await tx.user_Reset_Password.update({
      where: {
        id: id,
        userId: uid,
      },
      data: {
        status: 'EXPIRED',
      },
    });

    await tx.user_Reset_Password_History.create({
      data: {
        resetId: findUserResetPasswordInfo.id,
        userId: findUserResetPasswordInfo.userId,
        status: 'EXPIRED',
      },
    });
  });
};

export const updatePasswordService = async ({
  uid,
  password,
}: IReqUpdatePasswordServiceParams) => {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        uid: uid,
      },
      data: {
        password: password,
      },
    });

    const findUserResetPasswordInfo = await tx.user_Reset_Password.findFirst({
      where: {
        userId: uid,
      },
      orderBy: {
        id: 'desc',
      },
    });

    await tx.user_Reset_Password.update({
      where: {
        id: findUserResetPasswordInfo?.id!,
        userId: uid,
      },
      data: {
        status: 'DONE',
      },
    });

    await tx.user_Reset_Password_History.create({
      data: {
        userId: uid,
        resetId: findUserResetPasswordInfo?.id!,
        status: 'DONE',
      },
    });
  });
};

export const findResetPasswordHistoryService = async ({
  uid,
}: {
  uid: string;
}) => {
  return await prisma.user_Reset_Password.findFirst({
    where: {
      userId: uid,
    },
    orderBy: {
      id: 'desc',
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
    orderBy: {
      id: 'desc',
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
    const createUserEmailVerificationInfo =
      await tx.user_Email_Verification.create({
        data: {
          userId: uid,
          expireIn: date,
        },
      });

    await tx.user_Email_Verification_History.create({
      data: {
        userId: uid,
        verifId: createUserEmailVerificationInfo.id,
      },
    });

    return createUserEmailVerificationInfo;
  });
};

export const expiredUserEmailVerificationInfo = async ({
  uid,
  id,
}: {
  uid: string;
  id: number;
}) => {
  await prisma.$transaction(async (tx) => {
    const findUserEmailVerificationInfo =
      await tx.user_Email_Verification.update({
        where: {
          id: id,
          userId: uid,
        },
        data: {
          status: 'EXPIRED',
        },
      });

    await tx.user_Email_Verification_History.create({
      data: {
        verifId: findUserEmailVerificationInfo.id,
        userId: findUserEmailVerificationInfo.userId,
        status: 'EXPIRED',
      },
    });
  });
};

export const updateUserEmailService = async ({
  uid,
  email,
}: {
  uid: string;
  email: string;
}) => {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        uid: uid,
      },
      data: {
        email: email,
        verify: 'UNVERIFY',
      },
    });

    const findEmailVerificationInfo =
      await tx.user_Email_Verification.findFirst({
        where: {
          userId: uid,
        },
        orderBy: {
          id: 'desc',
        },
      });

    await tx.user_Email_Verification.update({
      where: {
        id: findEmailVerificationInfo?.id,
        userId: uid,
      },
      data: {
        status: 'DONE',
      },
    });

    await tx.user_Email_Verification_History.create({
      data: {
        userId: uid,
        verifId: findEmailVerificationInfo?.id!,
        status: 'DONE',
      },
    });
  });
};

export const findEmailVerificationHistoryResult = async ({
  uid,
}: {
  uid: string;
}) => {
  return await prisma.user_Email_Verification.findFirst({
    where: {
      userId: uid,
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const findUserByEmailService = async ({ email }: { email: string }) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const findAdminByUidService = async (uid: string) => {
  return await prisma.admin.findUnique({
    where: {
      uid: uid,
    },
  });
};
