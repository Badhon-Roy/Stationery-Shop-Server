import { Request, Response } from "express";
import { OrderServices } from "./order.service";


// order create
const createOrder = async(req: Request , res: Response) =>{
    try {
        const {order} = req.body;
    const result = await OrderServices.createOrderIntoDB(order)
    res.status(200).json({
        message: "Order created successfully",
        status: true,
        data : result
    })
    } catch (error) {
        res.status(200).json({
            message: "Something went wrong",
            status: false,
            error
        })
    }

}

export const OrderControllers = {
    createOrder,
}