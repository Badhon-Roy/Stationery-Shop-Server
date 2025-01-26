
import { TLoginUser } from "./auth.interface";
import User from "../user/user.model";
import AppError from "../../errors/AppError";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";

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

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)

    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)

    return {
        accessToken,
        refreshToken
    };
}

const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  
    const { email} = decoded;
  
    // checking if the user is exist
    const user = await User.isUserExistsByCustomEmail(email);
  
    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }
  
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  
    const accessToken = createToken(
        jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
    return {
      accessToken
    };
  };
  


export const AuthServices = {
    loginUser,
    refreshToken
}