import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";


const loginUser: RequestHandler = async (req, res) => {
    try {
        const result = await AuthServices.loginUser(req.body)
        res.status(200).json({
            message: 'User is logged in successfully',
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            message: 'Something went wrong',
            success: false,
            error,
        });
    }
}
export const AuthControllers = {
    loginUser
}