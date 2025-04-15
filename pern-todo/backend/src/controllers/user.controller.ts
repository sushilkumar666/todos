import { Request, Response } from "express"
import prisma from "../prismaclient";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            throw new Error("Fields are required")
        }

        const existedUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existedUser) {
            throw new Error("user already exists")
        }

        const salt = await bcrypt.genSalt(6);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        if (!user) {
            throw new Error('Error while creating user')
        }

        res.json({
            success: true,
            message: "user created Successfully",
            data: user
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            throw new Error("All Fields are required")
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error('user doesnot exists')
        }

        const verifyPassword = bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            throw new Error("Invalid credentials")
        }

        const accessToken = jwt.sign({
            id: user.id
        }, process.env.TOKEN_SECRET as string, { expiresIn: "2h" })

        const options = {
            httpOnly: true
        }

        res.cookie("accessToken", accessToken, options).json({
            success: true,
            message: "User Loggedin Successfully",
            accessToken
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { login, register }