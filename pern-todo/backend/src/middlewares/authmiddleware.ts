import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
// import prisma from "../prismaclient";


const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
        if (!token) {
            throw new Error("unAuthorized Access")
        }

        const decodedId = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;

        if (!decodedId) {
            throw new Error("Invalid Jwt Token")
        }

        // req.id = decodedId.id;
        req.id = decodedId.id
        next();

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default verifyJwt;