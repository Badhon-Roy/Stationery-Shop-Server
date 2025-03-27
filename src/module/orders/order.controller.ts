import { RequestHandler } from 'express';
import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';

// Create a new order
const createOrder = catchAsync(async (req, res) => {
  const { email } = req.body;
  const order = await OrderServices.createOrderIntoDB(email, req.body, req.ip!);
  res.status(200).json({
    message: 'Order placed successfully',
    success: true,
    data: order,
  })
})

const getOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrders(
    req.query,
  );

  res.status(200).json({
    message: 'Orders are retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.result,
  })
})

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  res.status(200).json({
    message: 'Order verify successfully',
    success: true,
    data: order,
  });
});

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

// update status
const updateOrderStatus = catchAsync(async (req, res) => {
  const { status, email, orderId } = req.body;
  if (!status || !email || !orderId) {
    res.status(400).json({
      message: 'Status, email, and orderId are required.',
      success: false,
    });
    return
  }

  // Call the service to update the order status
  const result = await OrderServices.updateOrderStatusFromDB(email, orderId, status);

  res.status(200).json({
    message: 'Order status updated successfully!',
    success: true,
    data: result
  })
});



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
const calculateRevenue: RequestHandler = async (req, res) => {
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
  getOrders,
  getSpecifOrder,
  updateOrder,
  deleteOrder,
  calculateRevenue,
  updateOrderStatus,
  verifyPayment
};
