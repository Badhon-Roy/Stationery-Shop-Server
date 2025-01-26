
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";


const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.createUserIntoDB(user);
  res.status(200).json({
    message: 'User created successfully',
    success: true,
    data: result,
  })
})

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  res.status(200).json({
    message: 'User retrieved successfully',
    success: true,
    data: result,
  })
})

// get specif product
const getSingleUser = catchAsync(async (req, res) => {

  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  res.status(200).json({
    message: 'User retrieved successfully',
    success: true,
    data: result,
  })
})

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser
}