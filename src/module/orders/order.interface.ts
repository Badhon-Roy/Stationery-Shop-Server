import { Document, Types } from "mongoose";

export interface TOrder extends Document {
  city: string;
  contactNo: string;
  division: string;
  localAddress: string;
  name: string;
  postCode: string;
  upozila: string;
  email: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipping" | "Completed" | "Cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
