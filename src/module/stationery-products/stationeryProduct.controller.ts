import { Request, Response } from "express";
import { StationeryProductServices } from "./stationeryProduct.service";


// stationery product create product controller
const createProduct = async(req : Request , res : Response) =>{
    try {
        const {product} = req.body;
    const result = await StationeryProductServices.createProductIntoDB(product);
    res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: result
          
    })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            success: true,
            error : error
    })
    }

}

export const StationeryProductControllers = {
    createProduct,
}