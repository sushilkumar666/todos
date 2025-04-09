import React from 'react'
import { Todo, useTodo } from '../context/todoContext'
import { Trash2, Edit } from 'lucide-react';
import { set, useFormContext } from "react-hook-form";

interface TodoItemProps {
    todo: Todo;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingId: React.Dispatch<React.SetStateAction<null | number>>;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, setEditing, setEditingId }) => {
    const { setValue } = useFormContext();

    const { updateTodo, deleteTodo } = useTodo();

    const handleAddNote = (title: string, id: number) => {
        setValue("newTodo", title);
        setEditing(true);
        setEditingId(id);

    };

    return (
        <div className='flex border-1 border-black rounded-sm my-2 py-2   justify-between px-2'>
            <div> {todo.title} </div>
            <div>
                <button><Edit className='mx-4' onClick={() => handleAddNote(todo.title, todo.id)} size={20} /></button><button onClick={() => deleteTodo(todo.id)}><Trash2 size={20} /></button>
            </div>
        </div>
    )
}

export default TodoItem