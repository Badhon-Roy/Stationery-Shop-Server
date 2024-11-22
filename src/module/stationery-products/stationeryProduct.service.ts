import { TStationeryProduct } from './stationeryProduct.interface';
import StationeryProductModel from './stationeryProduct.model';

// product create
const createProductIntoDB = async (product: TStationeryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// all product get
const getProductFromDB = async (searchTerm: string | undefined) => {
  const query: Record<string, unknown> = {};
  if (searchTerm) {
    Object.assign(query, {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }
  const result = await StationeryProductModel.find(query);
  if (!result.length) {
    throw new Error('Product not found!');
  }
  return result;
};

// specif product get
const getSpecifProductFromDB = async (id: string) => {
  const result = await StationeryProductModel.findById(id);
  return result;
};

// product update
const updateProductFromDB = async (id: string, data: TStationeryProduct) => {
  const result = await StationeryProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

// specif product delete
const deleteProductFromDB = async (id: string) => {
  const result = await StationeryProductModel.findByIdAndDelete(id);
  return result;
};
export const StationeryProductServices = {
  createProductIntoDB,
  getProductFromDB,
  getSpecifProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
