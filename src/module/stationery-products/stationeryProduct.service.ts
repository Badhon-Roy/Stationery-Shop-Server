import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from '../../constant/product.constant';
import { TStationeryProduct } from './stationeryProduct.interface';
import StationeryProductModel from './stationeryProduct.model';

// product create
const createProductIntoDB = async (product: TStationeryProduct) => {
  const result = await StationeryProductModel.create(product);
  return result;
};

// all product get
const getAllProductsFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicSemesterQuery = new QueryBuilder(StationeryProductModel.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
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
  getAllProductsFromDB,
  getSpecifProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
