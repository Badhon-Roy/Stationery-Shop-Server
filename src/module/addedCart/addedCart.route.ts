import { Router } from 'express';
import { AddedCartControllers } from './addedCart.controller';

const router = Router();

router.post('/add-cart',
    AddedCartControllers.addCart);
    
router.get('/get-addedCart/:cartId',
     AddedCartControllers.getSingleAddedCart);

router.get('/get-addedCart',
     AddedCartControllers.getAllAddedCarts);

router.put(
    '/update-addedCart/:cartId',
    AddedCartControllers.updateAddedCart,
);
router.delete(
    '/delete-addedCart/:cartId',
    AddedCartControllers.deleteAddedCart,
);

export const addedCartRouter = router;
