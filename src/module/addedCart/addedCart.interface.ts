import mongoose from 'mongoose';

export type TAddedCart = {
  email: string;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
};
