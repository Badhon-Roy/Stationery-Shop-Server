import { Router } from 'express';
import { StationeryProductControllers } from './stationeryProduct.controller';

const stationeryProductRouter = Router();

stationeryProductRouter.post('/', StationeryProductControllers.createProduct);
stationeryProductRouter.get('/:productId', StationeryProductControllers.getSpecifProduct);
stationeryProductRouter.get('/', StationeryProductControllers.getProduct);
stationeryProductRouter.put('/:productId', StationeryProductControllers.updateProduct);
stationeryProductRouter.delete('/:productId', StationeryProductControllers.deleteProduct);


export default stationeryProductRouter;
