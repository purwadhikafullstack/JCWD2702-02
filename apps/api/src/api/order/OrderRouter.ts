import { Router } from "express";
import { OrderController } from "./OrderController";

const orderController = new OrderController()
const router = Router()

router.post('/orders', orderController.createOrder.bind(orderController))

export default router