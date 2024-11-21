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

//Calculate Revenue from Orders
const calculateRevenueFromAllOrders = async () => {
  const revenue = await OrderModel.aggregate([
    // stage-1
    {
      $lookup: {
        from: 'stationeryproducts',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    // stage-2
    {
      $unwind: '$productDetails',
    },
    // stage-3
    {
      $project: {
        totalPrice: { $multiply: ['$productDetails.price', '$quantity'] },
      },
    },
    //stage-4
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    // stage-5
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return revenue.length > 0 ? revenue[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderIntoDB,
  updateProductStock,
  getOrderFromDB,
  calculateRevenueFromAllOrders,
};
