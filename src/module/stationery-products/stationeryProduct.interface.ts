import { Types } from "mongoose";

export type TStationeryProduct = {
  name: string;
  brand: string;
  image: string;
  price: number;
  category: Types.ObjectId;
  description: string;
  quantity: number;
  inStock: boolean;
};
