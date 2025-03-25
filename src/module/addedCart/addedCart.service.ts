
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
  const addedCartQuery = new QueryBuilder(AddedCartModel.find()
    .populate("products.productId"), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await addedCartQuery.modelQuery;
  const meta = await addedCartQuery.countTotal();

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

const updateProductQuantity = async (email : string, productId : string, change: number  ) => {
  const cart = await AddedCartModel.findOne({ email });

  if (!cart) {
      throw new Error("Cart not found");
  }

  let productExists = false;

  cart.products = cart.products.map((product) => {
      if (product.productId.toString() === productId) {
          product.quantity = Math.max(1, product.quantity + change); // Prevents going below 1
          productExists = true;
      }
      return product;
  });

  if (!productExists) {
      throw new Error("Product not found in cart");
  }

  await cart.save();
  return cart;
};




const deleteAddedCartFromDBByEmail = async (email: string, productId: string) => {
  const updatedCart = await AddedCartModel.findOneAndUpdate(
    { email },
    { $pull: { product: productId } },
    { new: true }
  );
  return updatedCart;
};



export const AddedCartServices = {
  addCartIntoDB,
  getAllAddedCartsFromDB,
  getSingleAddedCartFromDB,
  updateProductQuantity,
  deleteAddedCartFromDBByEmail
};
