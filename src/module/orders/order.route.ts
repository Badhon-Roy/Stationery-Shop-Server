import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();

router.post('/create-order',
    OrderControllers.createOrder);
router.get('/get-order/:orderId',
     OrderControllers.getOrder);

router.get('/get-order',
     OrderControllers.getOrder);

router.put(
    '/update-order/:orderId',
    OrderControllers.updateOrder,
);
router.delete(
    '/delete-order/:orderId',
    OrderControllers.deleteOrder,
);
router.get('/revenue', OrderControllers.calculateRevenue);

export const orderRouter = router;
