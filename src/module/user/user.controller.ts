import { RequestHandler } from "express";
import { UserServices } from "./user.service";


const createUser: RequestHandler = async (req, res) => {
   try {
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
        message: 'User created successfully',
        success: true,
        data: result,
    })
   } catch (error) {
    res.status(400).json({
        message: 'Something went wrong',
        success: false,
        data: error,
    })
   }
}

const getAllUser : RequestHandler = async (req, res)=>{
    try {
        const result = await UserServices.getAllUserFromDB();
        res.status(200).json({
            message: 'User retrieved successfully',
            success: true,
            data: result,
        })
       } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            success: false,
            data: error,
        })
       }
}

// get specif product
const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const result =
      await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      message: 'User retrieved successfully',
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
};

export const UserControllers = {
    createUser,
    getAllUser,
    getSingleUser
}