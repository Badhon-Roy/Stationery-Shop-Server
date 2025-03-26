/* eslint-disable @typescript-eslint/no-explicit-any */
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
//* get all listing product
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const { minPrice, maxPrice, categories, ...pQuery } =
    query;

  const filter: Record<string, any> = {};
  const parseArrayQuery = (param: unknown): string[] => {
    if (!param) return [];
    if (typeof param === 'string') return param.split(',');
    if (Array.isArray(param)) return param;
    return [param.toString()];
  };
  const categoryArray = parseArrayQuery(categories);
  if (categoryArray.length) filter.category = { $in: categoryArray };
  const listingQuery = new QueryBuilder(
    StationeryProductModel.find(filter).populate('category'),
    pQuery,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);

  const result = await listingQuery.modelQuery.lean();
  console.log(result);
  const meta = await listingQuery.countTotal();

  return { result, meta };
};



// specif product get
const getSpecifProductFromDB = async (id: string) => {
  const result = await StationeryProductModel.findById(id).populate('category');
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
