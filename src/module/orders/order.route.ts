import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post('/create-order',
    OrderControllers.createOrder);

router.get('/get-order/:orderId',
    OrderControllers.getSpecifOrder);

router.get('/get-order',
    OrderControllers.getOrders);

router.get("/verify", auth(USER_ROLE.user), OrderControllers.verifyPayment);

router.put(
    '/update-OrderStatus',
    auth(USER_ROLE.admin),
    OrderControllers.updateOrderStatus,
);
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
