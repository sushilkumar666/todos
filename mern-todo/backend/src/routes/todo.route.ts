import { Router } from "express";
import { updateTodo, addTodo, toggleTodo, deleteTodo, getAllTodos } from "../controllers/todo.controller";
import verifyJWT from "../middlewares/auth.middleware";
const router = Router();

router.get("/", getAllTodos)
router.post("/createTodo", verifyJWT, addTodo)
router.patch("/updatetodo/:id", verifyJWT, updateTodo)
router.patch("/toggletodo/:id", verifyJWT, toggleTodo)
router.delete("/deletetodo/:id", verifyJWT, deleteTodo)

export default router;
