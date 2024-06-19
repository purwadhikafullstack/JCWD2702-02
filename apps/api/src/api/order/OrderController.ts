import { Request, Response } from 'express';
import { OrderService } from './OrderService';
import { Order } from './OrderTypes';

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order: Order = req.body;
      const createdOrder = await orderService.createOrder(order);
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}