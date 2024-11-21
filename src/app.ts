import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import stationeryProductRouter from './module/stationery-products/stationeryProduct.route';

import orderRouter from './module/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application related api
app.use('/api/products', stationeryProductRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('The stationery shop is running');
});

export default app;
