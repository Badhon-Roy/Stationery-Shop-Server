
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


// get all user
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB(
    req.query,
  );

  res.status(200).json({
    message: 'Users are retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.result,
  })
});



// get specif user
const getSingleUser = catchAsync(async (req, res) => {

  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);
  res.status(200).json({
    message: 'User retrieved successfully',
    success: true,
    data: result,
  })
})

// update user
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  const result = await UserServices.updateUserFromDB(
    userId,
    data,
  );
  res.status(200).json({
    message: 'User profile updated successfully',
    success: true,
    data: result,
  });
})




// delete user
const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await UserServices.deleteUserFromDB(userId);
  res.status(200).json({
    message: 'User deleted successfully',
    success: true,
    data: {},
  })
});

export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser
}