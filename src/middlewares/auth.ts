
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config';
import { TUserRole } from '../module/user/user.interface';
import User from '../module/user/user.model';

const auth = (...requiredRoles : TUserRole[] )=> {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(401, 'You are not authorized')
    }

    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      console.log(error);
      throw new AppError(401, 'Unauthorized')
    }


    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByCustomEmail(email);

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }


    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401,'You are not authorized!');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
