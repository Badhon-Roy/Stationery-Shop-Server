
import QueryBuilder from '../../builder/QueryBuilder';
import StationeryProductModel from '../stationery-products/stationeryProduct.model';
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
  const product = await StationeryProductModel.findOne({_id : productId})


  if (!cart) {
      throw new Error("Cart not found");
  }
  if (!product) {
    throw new Error("Product not found");
  }

  if (change > 0 && product.quantity === 0) {
    throw new Error("Product is out of stock");
  }

  let productExists = false;

  cart.products = cart.products.map((cartItem) => {
    if (cartItem.productId.toString() === productId) {
      const newCartQuantity = Math.max(1, cartItem.quantity + change); // Prevents going below 1

      // Ensure we don't add more than available stock
      if (newCartQuantity > product.quantity) {
        throw new Error("Not enough stock available");
      }

      cartItem.quantity = newCartQuantity;
      productExists = true;
    }
    return cartItem;
  });

  if (!productExists) {
    throw new Error("Product not found in cart");
  }


  await StationeryProductModel.findByIdAndUpdate(
    productId,
    { $inc: { quantity: - change } },
    { new: true }
  );

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
