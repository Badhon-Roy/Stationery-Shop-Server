import StationeryProductModel from '../stationery-products/stationeryProduct.model';
import { TOrder } from './order.interface';
import OrderModel from './order.model';

// order create into the database
const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

// get all order
const getOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

//update product stock after an order
const updateProductStock = async (productId: string, quantity: number) => {
  const product = await StationeryProductModel.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  product.quantity -= quantity;
  if (product.quantity === 0) {
    product.inStock = false;
  }
  await product.save();
};

// //Calculate Revenue from Orders
// const calculateRevenueFromAllOrders = async()=>{

// }

export const OrderServices = {
  createOrderIntoDB,
  updateProductStock,
  getOrderFromDB,
};
