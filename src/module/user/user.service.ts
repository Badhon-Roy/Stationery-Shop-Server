import QueryBuilder from "../../builder/QueryBuilder";
import { UserSearchableFields } from "../../constant/user.constant";
import { TUser } from "./user.interface";
import User from "./user.model";


// user create into the database
const createUserIntoDB = async (user: TUser) => {
    const result = User.create(user);
    return result
}

// get all users
const getAllUserFromDB = async (
    query: Record<string, unknown>,
  ) => {
    const academicSemesterQuery = new QueryBuilder(User.find(), query)
      .search(UserSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await academicSemesterQuery.modelQuery;
    const meta = await academicSemesterQuery.countTotal();
  
    return {
      meta,
      result,
    };
  };




// get single user form the database
const getSingleUserFromDB = async(id : string) =>{
    const result = User.findById(id)
    return result;
}

// specif user delete
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};


export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB
}