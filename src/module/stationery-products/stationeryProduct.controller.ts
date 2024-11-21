import { Request, Response } from 'express';
import { StationeryProductServices } from './stationeryProduct.service';
import config from '../../config';

interface ValidationErrorDetails {
  message: string;
  name: string;
  kind: string;
  path: string;
  value: unknown;
}

interface ErrorResponse {
  message: string;
  success: boolean;
  error: {
    name: string;
    errors: Record<string, unknown>;
  };
  stack?: string | undefined;
}

interface CustomError extends Error {
  errors?: Record<string, ValidationErrorDetails>;
}

// stationery product create product controller
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await StationeryProductServices.createProductIntoDB(product);
    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    const errorResponse: ErrorResponse = {
      message: 'Validation failed',
      success: false,
      error: {
        name: 'Validation Error',
        errors: {},
      },
    };
    if (error instanceof Error) {
      errorResponse.message = 'Validation failed';
      errorResponse.error.name = error.name || 'Error';

      if ((error as CustomError).errors) {
        errorResponse.error.errors = (error as CustomError).errors || {};
      }

      if (config.node_env === 'development') {
        errorResponse.stack = error.stack;
      }
    }
    // If the error is not an instance of Error, just return a generic error
    else {
      errorResponse.message = 'An unknown error occurred';
      errorResponse.error.name = 'UnknownError';
    }
    res.status(500).json(errorResponse);
  }
};

// get all products
const getProduct = async (req: Request, res: Response) => {
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
      success: true,
      error,
    });
  }
};

// get specif product
const getSpecifProduct = async (req: Request, res: Response) => {
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
    res.status(400).json({
      message: 'Something went wrong',
      success: true,
      error,
    });
  }
};

// update product
const updateProduct = async (req: Request, res: Response) => {
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
      success: true,
      error,
    });
  }
};

// delete product
// get specif product
const deleteProduct = async (req: Request, res: Response) => {
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
      success: true,
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
