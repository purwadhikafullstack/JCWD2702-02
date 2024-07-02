import { prisma } from '../../lib/PrismaClient';
import {
  Order,
  OrderItem,
  Warehouse,
  createOrderServiceProps,
} from './OrderTypes';
import { OrderStatus } from '@prisma/client';

export class OrderService {
  async createOrder(order: Order) {
    // const isStockAvailable = await this.checkStock(order.items);
    // if (!isStockAvailable) {
    //   throw new Error('Stock is not available for one or more items');
    // }

    const nearestWarehouse = await this.findNearestWarehouse(order.address);
    if (!nearestWarehouse) {
      throw new Error('No warehouse found near the provided address');
    }
    // const createdOrder = await prisma.order.create({
    //   data: {
    //     userId: order.userId,
    //     address: order.address,
    //     status: 'pending',
    //     items: {
    //       create: order.items.map((item) => ({
    //         productId: item.productId,
    //         quantity: item.qty,
    //       })),
    //     },
    //   },
    //   include: {
    //     items: true,
    //   },
    // });

    // return createdOrder;
  }

  // async checkStock(items: OrderItem[]): Promise<boolean> {
  //   for (const item of items) {
  //     const totalStock = await prisma.warehouseStock.aggregate({
  //       where: { productId: item.productId },
  //       _sum: { stock: true },
  //     });

  //     if ((totalStock._sum.stock || 0) < item.qty) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  async findNearestWarehouse(address: string): Promise<Warehouse | null> {
    const userLocation = { latitude: -6.2, longitude: 106.816666 };

    const warehouses = await prisma.warehouse.findMany();
    let nearestWarehouse: Warehouse | null = null;
    let shortestDistance = Infinity;

    for (const warehouse of warehouses) {
      const distance = this.calculateDistance(userLocation, {
        latitude: warehouse.latitude,
        longitude: warehouse.longitude,
      });
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestWarehouse = {
          id: warehouse.id,
          latitude: warehouse.latitude,
          longitude: warehouse.longitude,
          stock: {},
        };
      }
    }

    return nearestWarehouse;
  }

  calculateDistance(
    loc1: { latitude: number; longitude: number },
    loc2: { latitude: number; longitude: number },
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(loc1.latitude)) *
        Math.cos(toRad(loc2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

export const getCheckoutMidtransService = async (uid: string) => {
  return await prisma.carts.findMany({
    where: {
      userId: uid,
      selected: true,
    },
    include: {
      Product: true,
    },
  });
};

export const createOrderService = async ({
  uid,
  orderId,
  addressId,
  totalAmount,
  shippingCost,
  paymentUrl,
}: createOrderServiceProps) => {
  await prisma.$transaction(async (tx) => {
    const createOrder = await tx.order.create({
      data: {
        id: orderId,
        userId: uid,
        addressId: addressId,
        shippingCost: shippingCost,
        totalOrderAmount: totalAmount,
        paymentUrl: paymentUrl,
      },
    });

    const findCheckoutItem = await tx.carts.findMany({
      where: {
        userId: uid,
        selected: true,
      },
      include: {
        Product: true,
      },
    });

    if (findCheckoutItem.length < 1) throw new Error('No selected item found');

    let orderItemsArr: any = [];

    findCheckoutItem.map((x: any) => {
      orderItemsArr.push({
        orderId: orderId,
        productId: x.Product.id,
        quantity: x.qty,
        currentPrice: x.Product.price,
        totalAmount: x.price,
      });
    });

    await tx.orderItem.createMany({
      data: [...orderItemsArr],
    });

    // await tx.carts.deleteMany({
    //   where: {
    //     selected: true,
    //   },
    // });
  });
};

export const getUserOrderService = async (uid: string) => {
  return await prisma.order.findMany({
    where: {
      userId: uid,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              ProductImages: true,
            },
          },
        },
      },
      address: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getTransactionByIdService = async (orderId: number) => {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
};

export const updateTransactionStatusService = async ({
  orderId,
  status,
}: {
  orderId: number;
  status: string;
}) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status as OrderStatus,
    },
  });
};
