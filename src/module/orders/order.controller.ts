import { RequestHandler } from 'express';
import { OrderServices } from './order.service';
import StationeryProductModel from '../stationery-products/stationeryProduct.model';
import catchAsync from '../../utils/catchAsync';

// order create
const createOrder : RequestHandler = async (req, res) => {
  try {
    const { email, product, quantity } = req.body;
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

const getOrder : RequestHandler = async (req, res) => {
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



// get specif order
const getSpecifOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result =
    await OrderServices.getSpecifOrderFromDB(orderId);
  res.status(200).json({
    message: 'Order retrieved successfully',
    success: true,
    data: result,
  })
})

// update order
const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const data = req.body;
  if (data?.quantity < 0) {
    res.status(400).json({
      ...(data.quantity < 0 && {
        message: `${data?.quantity} is a negative number. Quantity must be a positive number.`,
      }),
      success: false,
      data: {
        ...(data.quantity < 0 && { quantity: data.quantity }),
      },
    });
  } else {
    const result = await OrderServices.updateOrderFromDB(
      orderId,
      data,
    );
    res.status(200).json({
      message: 'Order updated successfully',
      success: true,
      data: result,
    });
  }
})


// delete order
const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  await OrderServices.deleteOrderFromDB(orderId);
  res.status(200).json({
    message: 'Order deleted successfully',
    success: true,
    data: {},
  })
});





// Calculate Revenue from Orders
const calculateRevenue : RequestHandler = async (req, res) => {
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
      data: {
        totalRevenue: totalRevenue,
      },
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
  getSpecifOrder,
  updateOrder,
  deleteOrder,
  calculateRevenue,
};
