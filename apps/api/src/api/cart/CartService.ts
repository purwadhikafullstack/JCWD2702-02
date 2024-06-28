import { prisma } from '@/lib/PrismaClient';
import { ICartItems, IAddToCartDetailService } from './CartTypes';

export const addToCartQuery = async (
  userId: string,
  productId: number,
  qty: number,
) => {
  return await prisma.$transaction(async (tx) => {
    const findProduct = await tx.product.findUnique({
      where: {
        id: productId,
      },
    });

    const findCart = await tx.carts.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (!findCart) {
      await tx.carts.create({
        data: {
          userId: userId,
          productId: productId,
          qty: qty,
        },
      });
    } else if (findCart) {
      await tx.carts.update({
        where: {
          id: findCart?.id,
        },
        data: {
          qty: findCart.qty + qty,
        },
      });
    }
  });
};

export const getUserCartQuery = async (userId: string) => {
  return await prisma.carts.findMany({
    where: {
      userId: userId,
    },
    include: {
      Product: true,
    },
  });
};

export const getCartDetailService = async ({
  uid,
  productId,
}: {
  uid: string;
  productId: number;
}) => {
  const findCartDetail = await prisma.carts.findFirst({
    where: {
      userId: uid,
      productId: productId,
    },
    include: {
      Product: true,
    },
  });

  const findProductImage = await prisma.product_Images.findMany({
    where: {
      productId: productId,
    },
  });

  return {
    findCartDetail,
    findProductImage,
  };
};

export const addToCartDetailService = async ({
  uid,
  productId,
  qty,
}: IAddToCartDetailService) => {
  console.log('??');
  await prisma.$transaction(async (tx) => {
    const findCart = await tx.carts.findFirst({
      where: {
        userId: uid,
        productId: productId,
      },
    });

    if (!findCart) throw new Error('Cart not found');

    await tx.carts.update({
      where: {
        id: findCart.id,
      },
      data: {
        qty: qty,
      },
    });
  });
};
