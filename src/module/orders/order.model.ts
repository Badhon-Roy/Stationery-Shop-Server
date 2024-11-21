import mongoose,{ model, Schema ,  } from 'mongoose';

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true , 'Email is required'],
      lowercase: true,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StationeryProduct',
      required: [true , "Product id is required"],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [1, 'Quantity must be a minimum 1.'],
    },
    totalPrice: {
      type: Number,
      required: [true , "Total price is required"],
      min: [0 ,'Total price must be a non-negative number'],
    },
  },
  {
    timestamps: true,
  },
);


const orderModel = model('Order' , orderSchema);
export default orderModel;
