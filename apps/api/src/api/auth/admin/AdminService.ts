import { prisma } from '@/lib/PrismaClient';
import {
  IReqAssignWarehouseAdminService,
  IReqCreateUserService,
  IReqUpdateUserService,
  IReqCreateWarehouseService,
  IReqCreateAdminService,
} from './AdminType';
import { UserVerify } from '@prisma/client';

export const findAdminByEmailService = async (email: string) => {
  return await prisma.admin.findFirst({
    where: {
      email: email,
    },
  });
};

export const findAdminByIdService = async ({ uid }: { uid: string }) => {
  return await prisma.admin.findUnique({
    where: {
      uid: uid,
    },
    include: {
      Role: true,
    },
  });
};

export const getWarehouseAdminService = async () => {
  return await prisma.admin.findMany({
    where: {
      adminRole: 2,
      deletedAt: null,
    },
    include: {
      Warehouse: true,
    },
  });
};

export const getWarehouseAdminDetailService = async ({
  uid,
}: {
  uid: string;
}) => {
  return await prisma.admin.findUnique({
    where: {
      uid: uid,
      deletedAt: null,
    },
    include: {
      Warehouse: true,
      Role: true,
    },
  });
};

export const getWarehouseService = async () => {
  return await prisma.warehouse.findMany();
};

export const assignWarehouseAdminService = async ({
  uid,
  name,
  email,
  warehouseId,
}: IReqAssignWarehouseAdminService) => {
  await prisma.$transaction(async (tx) => {
    const findAdmin = await tx.admin.findUnique({
      where: {
        uid: uid,
      },
    });

    await tx.admin.update({
      where: {
        uid: findAdmin?.uid,
      },
      data: {
        fullname: name,
        email: email,
        warehouseId: warehouseId,
      },
    });
  });
};

export const getAllUserService = async () => {
  const getAllAdminResult = await prisma.admin.findMany({
    where: {
      adminRole: 2,
    },
  });

  const getAllUserResult = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });

  return {
    getAllAdminResult,
    getAllUserResult,
  };
};

export const getUserDetailService = async ({ uid }: { uid: string }) => {
  return await prisma.user.findUnique({
    where: {
      uid: uid,
    },
    include: {
      Address: true,
    },
  });
};

export const createUserService = async ({
  fullname,
  email,
  password,
}: IReqCreateUserService) => {
  await prisma.user.create({
    data: {
      fullname: fullname,
      email: email,
      password: password,
    },
  });
};

export const updateUserService = async ({
  uid,
  fullname,
  email,
  verify,
}: IReqUpdateUserService) => {
  await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      fullname: fullname,
      email: email,
      verify: verify as UserVerify,
    },
  });
};

export const createWarehouseService = async ({
  name,
  province,
  provinceId,
  city,
  cityId,
  detail,
  postalCode,
  longitude,
  latitude,
}: IReqCreateWarehouseService) => {
  await prisma.warehouse.create({
    data: {
      name,
      province,
      provinceId: Number(provinceId),
      city,
      cityId: Number(cityId),
      detail,
      postalCode,
      longitude: Number(longitude),
      latitude: Number(latitude),
    },
  });
};

export const getWarehouseDetailService = async (id: number) => {
  return await prisma.warehouse.findUnique({
    where: {
      id: id,
    },
  });
};

export const updateWarehouseDetailService = async ({
  id,
  name,
  province,
  provinceId,
  city,
  cityId,
  detail,
  postalCode,
  longitude,
  latitude,
}: IReqCreateWarehouseService) => {
  await prisma.warehouse.update({
    where: {
      id: id,
    },
    data: {
      name,
      province,
      provinceId: Number(provinceId),
      city,
      cityId: Number(cityId),
      detail,
      postalCode,
      longitude: Number(longitude),
      latitude: Number(latitude),
    },
  });
};

export const createAdminService = async ({
  fullname,
  email,
  password,
}: IReqCreateAdminService) => {
  await prisma.admin.create({
    data: {
      fullname: fullname,
      email: email,
      password: password,
      adminRole: 2,
    },
  });
};

export const deleteAdminService = async (uid: string) => {
  await prisma.admin.update({
    where: {
      uid: uid,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const deleteUserService = async (uid: string) => {
  const findUser = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });

  if (!findUser) throw new Error('User not found');

  await prisma.user.update({
    where: {
      uid: uid,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
