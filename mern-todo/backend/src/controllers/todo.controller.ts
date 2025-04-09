import { Request, Response } from "express"
import Todo from "../models/todo.model"
import { AuthenticatedRequest } from "../types/global";




const getAllTodos = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const allTodos = await Todo.find({});

        if (!allTodos) {
            throw new Error("Error while fetching Todos")
        }
        res.json({
            success: true,
            message: "todos fetched successfully",
            data: allTodos
        })
    } catch (error) {

    }
}

const addTodo = (async (req: AuthenticatedRequest, res: Response) => {

    try {
        const id = req.user;

        const { title } = req.body;
        const newTodo = await Todo.create({
            title: title,
            completed: false,
            userId: id
        })

        res.json({
            success: true,
            data: newTodo
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }

})

const updateTodo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        // console.log(id + " this is todo id")
        const { title } = req.body;
        // console.log(title + " this is title")
        const updatedTodo = await Todo.findByIdAndUpdate(id, { $set: { title } }, { new: true })
        // if (!updatedTodo) {
        //     throw new Error("Error while updating Todo")
        // }
        res.json({
            success: true,
            data: updatedTodo
        })
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteTodo = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) throw new Error("Error while deleting")
        res.json({
            success: true,
            message: "deleted deleted successfully"
        })

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
    }

}


const toggleTodo = async (req: AuthenticatedRequest, res: Response) => {

    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
        throw new Error("Todo doesnot exists")
    }
    todo.completed = !todo?.completed;
    await todo.save();

    res.json({
        success: true,
        data: todo
    })
}

export { updateTodo, addTodo, deleteTodo, toggleTodo, getAllTodos };