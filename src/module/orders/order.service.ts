import { TOrder } from "./order.interface";
import orderModel from "./order.model";


// order create into the database
const createOrderIntoDB = async(order : TOrder)=>{
    const result = await orderModel.create(order);
    return result;
}

export const OrderServices = {
    createOrderIntoDB,
}