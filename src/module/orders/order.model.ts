import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    city: { type: String, required: true },
    contactNo: { type: String, required: true },
    division: { type: String, required: true },
    localAddress: { type: String, required: true },
    name: { type: String, required: true },
    postCode: { type: String, required: true },
    upozila: { type: String, required: true },
    email: { type: String, required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "StationeryProducts", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipping", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true }
);

const OrderModel = model<TOrder>('Order', orderSchema);
export default OrderModel;
