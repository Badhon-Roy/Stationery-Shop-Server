import { TUser } from "./user.interface";
import User from "./user.model";


// user create into the database
const createUserIntoDB = async (user: TUser) => {
    const result = User.create(user);
    return result
}

// get all user form the database 
const getAllUserFromDB = async () => {
    const result = User.find();
    return result;
}
// get single user form the database
const getSingleUserFromDB = async(id : string) =>{
    const result = User.findById(id)
    return result;
}
export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB
}