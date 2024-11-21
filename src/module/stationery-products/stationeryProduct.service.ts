import { TStationeryProduct } from './stationeryProduct.interface';
import StationeryProductModel from './stationeryProduct.model';

const createProductIntoDB = async (product: TStationeryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

export const StationeryProductServices = {
  createProductIntoDB,
};
