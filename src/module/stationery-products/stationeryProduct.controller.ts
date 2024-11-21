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

export const StationeryProductControllers = {
  createProduct,
};
