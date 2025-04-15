// import { jwt } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { AuthenticatedRequest } from "../types/global";

const registerUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!user) {
            throw new Error("Error while creating user");
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const login = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("user not exists")
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) {
            throw new Error("Invalid Credential")
        }

        const accessToken = await jwt.sign(
            {
                _id: user._id,

            },
            process.env.ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: "2h"
            }
        )

        // console.log(accessToken + " this is access toke whie login")
        const httpOptions = {
            httpOnly: true
        }

        res.cookie("accessToken", accessToken, httpOptions);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken,
        });

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, login };