import { google } from 'googleapis';
import { prisma } from './../../../lib/PrismaClient';

interface IReqUserRegisterByGoogleOauthServiceParams {
  name: string;
  email: string;
}

export const userRegisterByGoogleOauth = async ({
  name,
  email,
}: IReqUserRegisterByGoogleOauthServiceParams) => {
  return await prisma.user.create({
    data: {
      fullname: name,
      email: email,
      verify: 'VERIFIED',
      google: 'TRUE',
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

export const updateUserImageByGoogleOauth = async ({
  email,
  picture,
}: {
  email: string;
  picture: string;
}) => {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      userImageUrl: picture,
    },
  });
};
