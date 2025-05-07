import { Router } from "express";
import { addTodo, deleteTodo, getAllTodos } from "../controller/todo.controller";

const router = Router();

router.post('/', addTodo);
router.delete('/:id', deleteTodo)
router.get('/', getAllTodos)

export default router;