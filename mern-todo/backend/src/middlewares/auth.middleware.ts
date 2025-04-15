import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../models/user.model";

interface AuthenticatedRequest extends Request {
    user?: IUser;
}

interface DecodedToken extends JwtPayload {
    _id: string;
}

export const verifyJWT = (
    async (req: AuthenticatedRequest, _: Response, next: NextFunction) => {
        try {
            const token =
                req.cookies?.accessToken ||
                req.header("Authorization")?.replace("Bearer ", "");
            // console.log(token + " this is vlaue of token")
            if (!token) {
                throw new Error("Unauthorized request");
            }

            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as DecodedToken;

            if (!decoded) {
                throw new Error("Error while decoding token")
            }

            const user = await User.findById(decoded._id).select(
                "-password"
            );

            if (!user) {
                throw new Error("Invalid Access Token");
            }

            req.user = user;
            next();
        } catch (error: any) {
            throw new Error(error?.message || "Invalid access token");
        }
    }
);

export default verifyJWT;