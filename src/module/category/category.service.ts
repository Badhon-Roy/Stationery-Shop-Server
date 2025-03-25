import QueryBuilder from '../../builder/QueryBuilder';
import { TCategory } from './category.interface';
import CategoryModel from './category.model';

// category create
const createCategoryIntoDB = async (category: TCategory) => {
  const result = await CategoryModel.create(category);
  return result;
};

// all category get
const getAllCategoryFromDB = async (
  query: Record<string, unknown>,
) => {
  const categoryQuery = new QueryBuilder(CategoryModel.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;
  const meta = await categoryQuery.countTotal();

  return {
    meta,
    result,
  };
};

// specif category get
const getSpecifCategoryFromDB = async (id: string) => {
  const result = await CategoryModel.findById(id);
  return result;
};

// category update
const updateCategoryFromDB = async (id: string, data: TCategory) => {
  const result = await CategoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

// specif category delete
const deleteCategoryFromDB = async (id: string) => {
  const result = await CategoryModel.findByIdAndDelete(id);
  return result;
};
export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoryFromDB,
    getSpecifCategoryFromDB,
    updateCategoryFromDB,
    deleteCategoryFromDB
};
