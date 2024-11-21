import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import stationeryProductRouter from './module/stationery-products/stationeryProduct.route';
import config from './config';
import orderRouter from './module/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// middleware
interface ValidationErrorDetails {
  message: string;
  kind: string;
  path: string;
  value: unknown;
}

interface CustomError extends Error {
  status?: number;
  errors?: Record<string, ValidationErrorDetails>;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const errorResponse = {
    message: err.message || 'Something went wrong',
    success: false,
    error: {
      name: err.name || 'Error',
      errors: err.errors || {},
    },
    stack: config.node_env === 'development' ? err.stack : undefined,
  };
  res.status(err.status || 500).json(errorResponse);

  // call the next middleware
  next();
});

// application related api
app.use('/api/products', stationeryProductRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('The stationery shop is running');
});

export default app;
