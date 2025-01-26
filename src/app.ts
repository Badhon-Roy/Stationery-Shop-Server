import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Error } from 'mongoose';
import config from './config';
import router from './routes';
const app: Application = express();

//  Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// application related api
app.use('/api/v1', router);

// Error Interface
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
  stack?: string;
}

interface CustomError extends Error {
  status?: number;
  errors?: Record<string, ValidationErrorDetails>;
}

// Generic Error Handler Middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  const errorResponse: ErrorResponse = {
    message: 'Validation failed',
    success: false,
    error: {
      name: 'Validation Error',
      errors: {},
    },
  };
  if (error instanceof Error) {
    const customError = error as CustomError;
    errorResponse.message = customError.message || 'Validation failed';
    errorResponse.error.name = customError.name || 'Error';

    if (customError.errors) {
      errorResponse.error.errors = customError.errors || {};
    }

    if (config.node_env === 'development') {
      errorResponse.stack = customError.stack;
    }
  }
  // If the error is not an instance of Error, just return a generic error
  else {
    errorResponse.message = 'An unknown error occurred';
    errorResponse.error.name = 'UnknownError';
  }
  const statusCode = (error as CustomError)?.status || 500;
  res.status(statusCode).json(errorResponse);

  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('The stationery shop is running');
});

export default app;
