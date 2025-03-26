/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import StationeryProductModel from '../stationery-products/stationeryProduct.model';
import { TOrder } from './order.interface';
import OrderModel from './order.model';
import { orderUtils } from './order.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createOrderIntoDB = async (
  email: string,
  payload: any,
  client_ip: string
) => {
  if (!payload?.products?.length)
    throw new AppError(500, "Order is not specified");

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item : any) => {
      const product = await StationeryProductModel.findById(item.product);
      if (product) {
        console.log(product?.quantity);
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  let order = await OrderModel.create({
    email,
    products: productDetails,
    totalPrice,
    name: payload?.name || '',
    contactNo: payload?.contactNo || '',
    division: payload?.division || '',
    city: payload?.city || '',
    upozila: payload?.upozila || '',
    localAddress: payload?.localAddress || '',
    postCode: payload?.postCode || ''
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: payload?.name || '',
    customer_address: payload?.localAddress || '',
    customer_email: email,
    customer_phone: payload?.contactNo || '',
    customer_city: payload?.city || '',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }


   await Promise.all(
    products.map(async (item: any) => {
      await StationeryProductModel.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity } },
        { new: true }
      );
    })
  );



  return payment.checkout_url;
};

const getOrders = async (
  query: Record<string, unknown>,
) => {
  const orderQuery = new QueryBuilder(OrderModel.find()
    .populate("products.product"), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};





const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
                ? "Cancelled"
                : "",
      }
    );
  }

  return verifiedPayment;
};


// specif order get
const getSpecifOrderFromDB = async (id: string) => {
  const result = await OrderModel.findById(id);
  return result;
};

// order update
const updateOrderFromDB = async (id: string, data: TOrder) => {
  const result = await OrderModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return result;
};

// specif Order delete
const deleteOrderFromDB = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id);
  return result;
};


// update order status 
const updateOrderStatusFromDB = async (
  email: string,
  orderId: mongoose.Types.ObjectId,
  status: "Pending" | "Shipping"
): Promise<TOrder | null> => {
  try {
    const order = await OrderModel.findOne({ email, _id: orderId });
    if (!order) {
      return null;
    }
    order.status = status;
    await order.save();
    return order;
  } catch (error) {
    throw new Error('Error updating order status: ' + error);
  }
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
  getSpecifOrderFromDB,
  updateOrderFromDB,
  deleteOrderFromDB,
  updateProductStock,
  getOrders,
  verifyPayment,
  updateOrderStatusFromDB,
  calculateRevenueFromAllOrders,
};
