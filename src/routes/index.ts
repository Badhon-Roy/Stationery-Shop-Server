import { Router } from "express";
import orderRouter from "../module/orders/order.route";
import { stationeryProductRouter } from "../module/stationery-products/stationeryProduct.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/products',
        route: stationeryProductRouter
    },
    {
        path: '/orders',
        route: orderRouter
    }
]


moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;