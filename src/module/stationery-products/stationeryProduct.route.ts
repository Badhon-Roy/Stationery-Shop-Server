import { Router } from 'express';
import { StationeryProductControllers } from './stationeryProduct.controller';

const router = Router();

router.post('/', StationeryProductControllers.createProduct);
router.get(
  '/:productId',
  StationeryProductControllers.getSpecifProduct,
);
router.get('/', StationeryProductControllers.getProduct);
router.put(
  '/:productId',
  StationeryProductControllers.updateProduct,
);
router.delete(
  '/:productId',
  StationeryProductControllers.deleteProduct,
);

export const stationeryProductRouter = router;
