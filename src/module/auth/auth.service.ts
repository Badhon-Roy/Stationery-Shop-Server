
import { TLoginUser } from "./auth.interface";
import User from "../user/user.model";
import AppError from "../../errors/AppError";
import jwt from 'jsonwebtoken'
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
    /// checking if the user is exist
    const user = await User.isUserExistsByCustomEmail(payload?.email);
    if (!user) {
        throw new AppError(404, 'This user is not found !');
    }

    // checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(403, 'Password do not matched');

    const jwtPayload = {
        email: user?.email,
        role: user?.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

    return {
        accessToken
    };
}
export const AuthServices = {
    loginUser
}