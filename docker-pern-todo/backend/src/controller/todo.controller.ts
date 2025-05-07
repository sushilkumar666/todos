import prisma from "../prismaclient";
import { Request, Response } from "express";

const addTodo = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        const todo = await prisma.todo.create({
            data: {

                title: title,
                completed: false
            }
        })

        res.json({
            success: true,
            data: todo
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTodo = await prisma.todo.delete({
            where: {
                id: Number(id)
            }
        })

        if (!deletedTodo) {
            throw new Error("Error whilte Deleting Todo")
        }

        res.json({
            success: true,
            data: deletedTodo
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getAllTodos = async (req: Request, res: Response) => {
    try {

        const todos = await prisma.todo.findMany({});

        res.json({
            success: true,
            data: todos
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { addTodo, deleteTodo, getAllTodos };
