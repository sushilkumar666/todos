import { Router } from "express";
import { updateTodo, addTodo, toggleTodo, deleteTodo, getUserTodos } from "../controllers/todo.controller";
import verifyJWT from "../middlewares/auth.middleware";
const router = Router();

router.get("/", verifyJWT, getUserTodos)
router.post("/createtodo", verifyJWT, addTodo)
router.patch("/updatetodo/:id", verifyJWT, updateTodo)
router.patch("/toggletodo/:id", verifyJWT, toggleTodo)
router.delete("/deletetodo/:id", verifyJWT, deleteTodo)

export default router;
