import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import AddedCartModel from './addedCart.model';
import { AddedCartServices } from './addedCart.service';
import mongoose from 'mongoose';


const addCart: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { email, product } = req.body;
        if (!email || !product) {
            res.status(400).json({
                success: false,
                message: 'Email and product are required.',
            });
            return;
        }
        const productId = new mongoose.Types.ObjectId(product);
        const existingCartItem = await AddedCartModel.findOne({ email });

        if (existingCartItem) {
            if (!existingCartItem.product.some((p) => p.equals(productId))) {
                existingCartItem.product.push(productId);
                await existingCartItem.save();

                res.status(200).json({
                    success: true,
                    message: 'Product added to the cart successfully.',
                    data: existingCartItem,
                });
                return;
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Product already in the cart.',
                    data: existingCartItem,
                });
                return;
            }
        }

        const newCartItem = {
            email,
            product: [productId],
            quantity: 1,
        };

        const result = await AddedCartServices.addCartIntoDB(newCartItem);

        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully.',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// get all added carts
const getAllAddedCarts = catchAsync(async (req, res) => {
    const result = await AddedCartServices.getAllAddedCartsFromDB(
      req.query,
    );
  
    res.status(200).json({
      message: 'Added carts are retrieved successfully',
      success: true,
      meta: result.meta,
      data: result.result,
    })
  });



// get specif product
const getSingleAddedCart = catchAsync(async (req, res) => {
    const { cartId } = req.params;
    const result =
        await AddedCartServices.getSingleAddedCartFromDB(cartId);
    res.status(200).json({
        message: 'Added Cart retrieved successfully',
        success: true,
        data: result,
    })
})

// update product
const updateAddedCart = catchAsync(async (req, res) => {
    const { cartId } = req.params;
    const data = req.body;
    if (data?.price < 0 || data?.quantity < 0) {
        res.status(400).json({
            ...(data.price < 0 && {
                message: `${data?.price} is a negative number. Price must be a positive number.`,
            }),
            ...(data.quantity < 0 && {
                message: `${data?.quantity} is a negative number. Quantity must be a positive number.`,
            }),
            success: false,
            data: {
                ...(data.price < 0 && { price: data.price }),
                ...(data.quantity < 0 && { quantity: data.quantity }),
            },
        });
    } else {
        const result = await AddedCartServices.updateAddedCartFromDB(
            cartId,
            data,
        );
        res.status(200).json({
            message: 'Added Cart updated successfully',
            success: true,
            data: result,
        });
    }
})


// delete product
const deleteAddedCart = catchAsync(async (req, res) => {
    const { cartId } = req.params;
    await AddedCartServices.deleteAddedCartFromDB(cartId);
    res.status(200).json({
        message: 'Product deleted successfully',
        success: true,
        data: {},
    })
});

export const AddedCartControllers = {
    addCart,
    getAllAddedCarts,
    getSingleAddedCart,
    updateAddedCart,
    deleteAddedCart
};
