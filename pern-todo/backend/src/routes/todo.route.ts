import { Router } from "express";
import { addTodo, updateTodo, toggleTodo, getTodo, deleteTodo } from "../controllers/todo.controller";
import verifyJwt from "../middlewares/authmiddleware";

const router = Router();

router.get('/fetchtodo', verifyJwt, getTodo);
router.post('/addtodo', verifyJwt, addTodo)
router.patch('/updatetodo/:id', verifyJwt, updateTodo)
router.patch('/toggletodo/:id', verifyJwt, toggleTodo)
router.delete('/deletetodo/:id', verifyJwt, deleteTodo)

export default router;