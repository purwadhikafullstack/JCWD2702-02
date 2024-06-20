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

interface IReqUserAddress {
  uid: string;
  addressId: number;
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

export const findUserAddressService = async ({ uid }: { uid: string }) => {
  return await prisma.address.findMany({
    where: {
      userId: uid,
      deletedAt: null,
    },
    orderBy: {
      main: 'asc',
    },
  });
};

export const mainUserAddressService = async ({
  uid,
  addressId,
}: IReqUserAddress) => {
  await prisma.$transaction(async (tx) => {
    const findMainAddress = await tx.address.findFirst({
      where: {
        userId: uid,
        main: 'TRUE',
      },
    });

    // console.log(findMainAddress);

    if (findMainAddress) {
      await tx.address.update({
        where: {
          id: findMainAddress.id,
        },
        data: {
          main: 'FALSE',
        },
      });
    }

    await tx.address.update({
      where: {
        id: addressId,
        userId: uid,
      },
      data: {
        main: 'TRUE',
      },
    });
  });
};

export const findUserAddressDetailService = async ({
  uid,
  addressId,
}: IReqUserAddress) => {
  return await prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });
};

export const deleteUserAddressService = async ({
  uid,
  addressId,
}: IReqUserAddress) => {
  await prisma.address.update({
    where: {
      id: addressId,
      userId: uid,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
