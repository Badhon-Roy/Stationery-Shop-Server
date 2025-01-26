import { TUser } from "./user.interface";
import UserModel from "./user.model";


// user create into the database
const createUserIntoDB = async (user: TUser) => {
    const result = UserModel.create(user);
    return result
}

// get all user form the database 
const getAllUserFromDB = async () => {
    const result = UserModel.find();
    return result;
}
// get single user form the database
const getSingleUserFromDB = async(id : string) =>{
    const result = UserModel.findById(id)
    return result;
}
export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB
}