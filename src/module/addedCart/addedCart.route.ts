import { Router } from 'express';
import { AddedCartControllers } from './addedCart.controller';

const router = Router();

router.post('/add-cart',
    AddedCartControllers.addCart);

router.get('/get-addedCart/:cartId',
     AddedCartControllers.getSingleAddedCart);

router.get('/get-addedCart',
     AddedCartControllers.getAllAddedCarts);

router.patch("/update-quantity", AddedCartControllers.updateCartQuantity);

router.delete(
    '/delete-addedCart',
    AddedCartControllers.deleteAddedCart,
);

export const addedCartRouter = router;
