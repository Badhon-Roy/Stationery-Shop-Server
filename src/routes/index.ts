import { Router } from "express";
import { stationeryProductRouter } from "../module/stationery-products/stationeryProduct.route";
import { userRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.route";
import { orderRouter } from "../module/orders/order.route";
import { addedCartRouter } from "../module/addedCart/addedCart.route";
import { categoryRouter } from "../module/category/category.route";
import { favoriteRouter } from "../module/addedFavorite/addedFavorite.route";
import { blogsRouter } from "../module/blog/blog.route";


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
    },
    {
        path: '/addedCarts',
        route: addedCartRouter
    },
    {
        path: '/addedFavorites',
        route: favoriteRouter
    },
    {
        path: '/categories',
        route: categoryRouter
    },
    {
        path: '/blogs',
        route: blogsRouter
    },
]


moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;