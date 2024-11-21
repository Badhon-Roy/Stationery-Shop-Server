import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import StationeryProductModel from '../stationery-products/stationeryProduct.model';

// order create
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body.order;

    //------------------
    const productDetails = await StationeryProductModel.findById(product);

    // check product is available
    if (!productDetails) {
      res.status(404).json({
        message: 'Product not found.',
        status: false,
      });
      return;
    }

    //check the requested quantity is available
    if (productDetails.quantity < quantity) {
      res.status(400).json({
        message: 'Insufficient stock available.',
        status: false,
      });
      return;
    }

    // convert id into Object Id
    // const productId = new mongoose.Types.ObjectId(product);

    //calculate total price
    const totalPrice: number = productDetails?.price * quantity;

    // create the order
    const newOrder = {
      email,
      product,
      quantity,
      totalPrice,
    };
    const result = await OrderServices.createOrderIntoDB(newOrder);

    //--------------------------------

    await OrderServices.updateProductStock(product, quantity);

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      status: false,
      error,
    });
  }
};

// get all order

const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getOrderFromDB();
    res.status(200).json({
      message: 'Order retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      status: false,
      error,
    });
  }
};

// Calculate Revenue from Orders
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenueFromAllOrders();
    if (totalRevenue === 0) {
      res.status(404).json({
        message: 'No orders found',
        status: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: totalRevenue,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      status: false,
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrder,
  calculateRevenue,
};
