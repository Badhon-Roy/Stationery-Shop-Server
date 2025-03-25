import { NextFunction, Request, RequestHandler, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AddedCartModel from './addedCart.model';
import { AddedCartServices } from './addedCart.service';
import mongoose from 'mongoose';


const addCart: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { email, product } = req.body;

        // Ensure both email and product are provided
        if (!email || !product) {
            res.status(400).json({
                success: false,
                message: 'Email and product are required.',
            });
            return;
        }

        const productId = new mongoose.Types.ObjectId(product);

        // Find an existing cart for the user
        const existingCartItem = await AddedCartModel.findOne({ email });

        if (existingCartItem) {
            // Check if the product already exists in the cart
            const productIndex = existingCartItem.products.findIndex((p) =>
                p.productId.equals(productId)
            );

            if (productIndex !== -1) {
                // If the product is already in the cart, just return the cart without modifying
                res.status(200).json({
                    success: true,
                    message: 'Product already in the cart.',
                    data: existingCartItem,
                });
                return;
            } else {
                // If the product is not in the cart, add it
                existingCartItem.products.push({
                    productId,
                    quantity: 1, // Set initial quantity to 1
                });
                await existingCartItem.save();

                res.status(200).json({
                    success: true,
                    message: 'Product added to the cart successfully.',
                    data: existingCartItem,
                });
                return;
            }
        }

        // If no cart exists for the user, create a new cart entry with the product
        const newCartItem = {
            email, // No need for casting as `email` is guaranteed to be a string
            products: [
                {
                    productId,
                    quantity: 1, // Set default quantity if required
                },
            ],
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
const updateCartQuantity: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { email, productId, change } = req.body;

    if (!email || !productId || !change) {
        res.status(400).json({
            success: false,
            message: "Email, productId, and change value are required",
        });
        return
    }

    try {
        const updatedCart = await AddedCartServices.updateProductQuantity(email, productId, change);

        res.status(200).json({
            success: true,
            message: "Product quantity updated successfully",
            data: updatedCart,
        });
    } catch (error) {
        next(error);  // Pass the error to the global error handler
    }
};


const deleteAddedCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email } = req.query;
        const { productId } = req.body;

        // Ensure that email and productId are provided
        if (!email || !productId) {
            res.status(400).json({
                message: 'Email and productId are required.',
                success: false,
                data: {},
            });
            return;
        }

        // Find and update the cart by removing the product from the products array
        const updatedCart = await AddedCartModel.findOneAndUpdate(
            { email }, // Find the cart by email
            { $pull: { products: { productId } } }, // Remove product with the matching productId
            { new: true } // Return the updated document
        );

        // If no cart is found or product is not in the cart
        if (!updatedCart || updatedCart.products.length === 0) {
            res.status(404).json({
                message: 'Cart or product not found for the provided email',
                success: false,
                data: {},
            });
            return;
        }

        // Send the response with the updated cart data
        res.status(200).json({
            message: 'Product removed successfully',
            success: true,
            data: updatedCart,
        });
    } catch (error) {
        next(error);
    }
};






export const AddedCartControllers = {
    addCart,
    getAllAddedCarts,
    getSingleAddedCart,
    updateCartQuantity,
    deleteAddedCart
};
