import { Router } from "express";
import { stationeryProductRouter } from "../module/stationery-products/stationeryProduct.route";
import { userRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.route";
import { orderRouter } from "../module/orders/order.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/products',
        route: stationeryProductRouter
    },
    {
        path: '/orders',
        route: orderRouter
    },
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    }
]


moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;