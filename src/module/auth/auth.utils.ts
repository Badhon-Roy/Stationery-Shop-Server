/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

// Define the payload interface
interface Payload {
    email: string;
    role: string;
}

// Function to create a token
export const createToken = (
    jwtPayload: Payload,
    secret: string,
    expiresIn: any
): string => {
    const options: SignOptions = {
        expiresIn, // 'expiresIn' should be either a string or number.
    };

    return jwt.sign(jwtPayload, secret, options);
};

// Function to verify the token
export const verifyToken = (token: string, secret: string): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload;
};
