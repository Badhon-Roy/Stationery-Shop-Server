import { Router } from 'express';
import { StationeryProductControllers } from './stationeryProduct.controller';

const stationeryProductRouter = Router();

stationeryProductRouter.post('/', StationeryProductControllers.createProduct);
stationeryProductRouter.get('/:productId', StationeryProductControllers.getSpecifProduct);
stationeryProductRouter.get('/', StationeryProductControllers.getProduct);

export default stationeryProductRouter;
