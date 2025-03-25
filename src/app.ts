import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

//  Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['https://stationery-shop-client-sandy.vercel.app'], credentials: true }));

// application related api
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);


app.get('/', (req: Request, res: Response) => {
  res.send('The stationery shop is running');
});

export default app;
