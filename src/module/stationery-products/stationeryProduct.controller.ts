import {  RequestHandler } from 'express';
import { StationeryProductServices } from './stationeryProduct.service';
import catchAsync from '../../utils/catchAsync';




// stationery product create product controller
const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await StationeryProductServices.createProductIntoDB(product);
  res.status(200).json({
    message: 'Product created successfully',
    success: true,
    data: result,
  })
})

// get all products
const getProduct: RequestHandler = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const result = await StationeryProductServices.getProductFromDB(searchTerm);
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      success: false,
      error,
    });
  }
};

// get specif product
const getSpecifProduct: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const result =
      await StationeryProductServices.getSpecifProductFromDB(productId);
    res.status(200).json({
      message: 'Products retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      success: false,
      error,
    });
  }
};

// update product
const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.params;
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
      const result = await StationeryProductServices.updateProductFromDB(
        productId,
        data,
      );
      res.status(200).json({
        message: 'Product updated successfully',
        success: true,
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      success: false,
      error,
    });
  }
};

// delete product
const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    await StationeryProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      success: false,
      error,
    });
  }
};

export const StationeryProductControllers = {
  createProduct,
  getSpecifProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
