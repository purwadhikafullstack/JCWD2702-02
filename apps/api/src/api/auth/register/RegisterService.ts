import { prisma } from './../../../lib/PrismaClient';
import { IReqUserRegisterService } from './RegisterType';

export const userRegisterService = async ({
  fullname,
  email,
  password,
}: IReqUserRegisterService) => {
  return await prisma.user.create({
    data: {
      fullname: fullname,
      email: email,
      password: password,
    },
  });
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
