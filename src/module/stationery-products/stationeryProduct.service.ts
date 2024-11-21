import { TStationeryProduct } from './stationeryProduct.interface';
import StationeryProductModel from './stationeryProduct.model';

// product create
const createProductIntoDB = async (product: TStationeryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// all product get
const getProductFromDB = async () => {
  const result = await StationeryProductModel.find();
  return result;
};

export const StationeryProductServices = {
  createProductIntoDB,
  getProductFromDB
};
