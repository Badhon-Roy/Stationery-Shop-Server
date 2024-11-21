import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import stationeryProductRouter from './module/stationery-products/stationeryProduct.route';
import { Error } from 'mongoose';
const app: Application = express();


app.use(express.json());
app.use(cors());

// application related api
app.use('/api/products' , stationeryProductRouter)



app.get('/', (req: Request, res: Response) => {
  res.send('The stationery shop is running');
});

export default app;
