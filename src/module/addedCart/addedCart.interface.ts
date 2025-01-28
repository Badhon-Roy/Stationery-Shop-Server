import mongoose from 'mongoose';

export type TAddedCart = {
  email: string;
  product: mongoose.Types.ObjectId[];
  quantity: number;
};
