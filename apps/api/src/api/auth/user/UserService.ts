import { prisma } from './../../../lib/PrismaClient';

interface IRequserImageUploadServiceParams {
  uid: string;
  imageUrl: any;
}

interface IReqcreateUserAddressService {
  uid: string;
  recipients: string;
  address: string;
  phoneNumber: string;
  postalCode: string;
}

export const userImageUploadService = async ({
  uid,
  imageUrl,
}: IRequserImageUploadServiceParams) => {
  await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      userImageUrl: imageUrl,
    },
  });
};

export const createUserAddressService = async ({
  uid,
  recipients,
  address,
  phoneNumber,
  postalCode,
}: IReqcreateUserAddressService) => {
  await prisma.address.create({
    data: {
      userId: uid,
      recipients: recipients,
      address: address,
      phoneNumber: phoneNumber,
      postalCode: postalCode,
    },
  });
};
