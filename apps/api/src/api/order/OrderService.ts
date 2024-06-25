import { prisma } from '../../lib/PrismaClient';
import { Order, OrderItem, Warehouse } from './OrderTypes';

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
