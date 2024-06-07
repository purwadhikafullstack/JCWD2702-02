import { prisma } from './../../../lib/PrismaClient';
import {
  IReqUserRegisterByEmailServiceParams,
  userVerificationByEmailServiceParams,
} from './RegisterTypes';

export const userRegisterByEmailService = async ({
  fullname,
  email,
}: IReqUserRegisterByEmailServiceParams) => {
  return await prisma.user.create({
    data: {
      fullname: fullname,
      email: email,
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

export const userVerificationByEmailService = async ({
  uid,
  password,
}: userVerificationByEmailServiceParams) => {
  return await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      verify: 'VERIFIED',
      password: password,
    },
  });
};
