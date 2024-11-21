import { Router } from 'express';
import { OrderControllers } from './order.controller';

const orderRouter = Router();

orderRouter.post('/', OrderControllers.createOrder);
orderRouter.get('/', OrderControllers.getOrder);

export default orderRouter;
