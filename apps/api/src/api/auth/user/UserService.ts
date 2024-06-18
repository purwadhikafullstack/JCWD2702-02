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
  province: string;
  provinceId: number;
  city: string;
  cityId: number;
  longitude: string;
  latitude: string;
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
  province,
  provinceId,
  city,
  cityId,
  phoneNumber,
  postalCode,
  longitude,
  latitude,
}: IReqcreateUserAddressService) => {
  await prisma.address.create({
    data: {
      userId: uid,
      recipients: recipients,
      address: address,
      province: province,
      provinceId: Number(provinceId),
      city: city,
      cityId: Number(cityId),
      phoneNumber: phoneNumber,
      postalCode: postalCode,
      latitude: latitude,
      longitude: longitude,
    },
  });
};
