import { Request, Response } from "express"
import prisma from "../prismaclient";

const addTodo = async (req: Request, res: Response) => {

    try {
        const { title } = req.body;
        const id = req.id;
        if (!id) {
            throw new Error("unAuthorised Request")
        }

        const todo = await prisma.todo.create({
            data: {
                title: title,
                userId: id
            }
        })

        if (!todo) {
            throw new Error("Error while creating Todo")
        }
        res.json({
            success: true,
            data: todo,
            message: 'todo created successfully'
        })

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateTodo = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { title } = req.body


    try {
        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                title: title
            }
        })
        if (!updatedTodo) {
            throw new Error("Error while updating todo")
        }

        res.json({
            success: true,
            data: updateTodo,
            message: 'todo updated successfully'
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message,
            data: updateTodo
        })
    }

}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTodo = await prisma.todo.delete({
            where: {
                id: id
            }
        })
        if (!deleteTodo) throw new Error("Error while deleting todo")

        res.json({
            success: true,
            message: "todo deleted successfully",
            data: deleteTodo
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getTodo = async (req: Request, res: Response) => {
    try {
        const id = req.id;

        const todos = await prisma.todo.findMany({
            where: {
                userId: id
            }
        })
        if (!todos) {
            throw new Error("error while fetching Todos")
        }
        res.json({
            success: true,
            message: "todo fetched successfully",
            data: todos
        })

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const toggleTodo = async (req: Request, res: Response) => {

    const { id } = req.params;


    try {
        const toggledTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                completed: !req.body.completed
            }
        })
        if (!toggledTodo) {
            throw new Error("Error while toggling todo")
        }
        res.json({
            success: true,
            data: toggledTodo,
            message: "todo toggle successfully"
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}



export { addTodo, toggleTodo, updateTodo, getTodo, deleteTodo }

