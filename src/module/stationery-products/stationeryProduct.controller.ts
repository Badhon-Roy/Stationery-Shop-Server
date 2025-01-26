import { RequestHandler } from 'express';
import { StationeryProductServices } from './stationeryProduct.service';
import catchAsync from '../../utils/catchAsync';




// stationery product create product controller
const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await StationeryProductServices.createProductIntoDB(product);
  res.status(200).json({
    message: 'Product created successfully',
    success: true,
    data: result,
  })
})

// get all products
const getProduct = catchAsync(async (req, res) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  const result = await StationeryProductServices.getProductFromDB(searchTerm);
  res.status(200).json({
    message: 'Products retrieved successfully',
    success: true,
    data: result,
  })
})

// get specif product
const getSpecifProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result =
    await StationeryProductServices.getSpecifProductFromDB(productId);
  res.status(200).json({
    message: 'Products retrieved successfully',
    success: true,
    data: result,
  })
})

// update product
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const data = req.body;
  if (data?.price < 0 || data?.quantity < 0) {
    res.status(400).json({
      ...(data.price < 0 && {
        message: `${data?.price} is a negative number. Price must be a positive number.`,
      }),
      ...(data.quantity < 0 && {
        message: `${data?.quantity} is a negative number. Quantity must be a positive number.`,
      }),
      success: false,
      data: {
        ...(data.price < 0 && { price: data.price }),
        ...(data.quantity < 0 && { quantity: data.quantity }),
      },
    });
  } else {
    const result = await StationeryProductServices.updateProductFromDB(
      productId,
      data,
    );
    res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      data: result,
    });
  }
})


// delete product
const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await StationeryProductServices.deleteProductFromDB(productId);
  res.status(200).json({
    message: 'Product deleted successfully',
    success: true,
    data: {},
  })
});

export const StationeryProductControllers = {
  createProduct,
  getSpecifProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
