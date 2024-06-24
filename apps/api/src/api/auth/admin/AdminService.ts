import { prisma } from '@/lib/PrismaClient';
import {
  IReqAssignWarehouseAdminService,
  IReqCreateUserService,
  IReqUpdateUserService,
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
  });
};

export const getWarehouseAdminService = async () => {
  return await prisma.admin.findMany({
    where: {
      adminRole: 2,
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

  const getAllUserResult = await prisma.user.findMany();

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
