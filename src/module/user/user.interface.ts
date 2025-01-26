/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
    name: string;
    photoUrl?: string;
    role: 'admin' | 'user';
    email: string;
    password: string;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}