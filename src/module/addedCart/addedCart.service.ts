
import QueryBuilder from '../../builder/QueryBuilder';
import { TAddedCart } from './addedCart.interface';
import AddedCartModel from './addedCart.model';

// add cart
const addCartIntoDB = async (cart: TAddedCart) => {
    const result = await AddedCartModel.create(cart);
    return result;
};


// all added cart get
const getAllAddedCartsFromDB = async (
    query: Record<string, unknown>,
  ) => {
    const academicSemesterQuery = new QueryBuilder(AddedCartModel.find(), query)
      .search(['email'])
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



// specif added cart get
const getSingleAddedCartFromDB = async (id: string) => {
    const result = await AddedCartModel.findById(id);
    return result;
};

// added cart update
const updateAddedCartFromDB = async (id: string, data: TAddedCart) => {
    const result = await AddedCartModel.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
};

// specif added cart delete
const deleteAddedCartFromDB = async (id: string) => {
    const result = await AddedCartModel.findByIdAndDelete(id);
    return result;
};
export const AddedCartServices = {
    addCartIntoDB,
    getAllAddedCartsFromDB,
    getSingleAddedCartFromDB,
    updateAddedCartFromDB,
    deleteAddedCartFromDB
};
