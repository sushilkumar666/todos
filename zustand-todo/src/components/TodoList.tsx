import React, { useState } from 'react'
import useTodoStore from '../zustand/store'
import { Trash, Pencil } from 'lucide-react';

function TodoList() {

    const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodoStore()
    const [inputValue, setInputValue] = useState("")
    const [editingId, setEditingId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (editingId) {
            console.log(inputValue);
            updateTodo(editingId, inputValue)
            setInputValue("")
            setEditingId(null);
        } else {
            console.log(inputValue);
            addTodo(inputValue)
            setInputValue("")
        }
    }

    const handleEdit = (id: number, title: string) => {
        setEditingId(id);
        setInputValue(title)
    }

    const handlePrevious = (page: number) => {
        console.log("previous");
        setPage((prev) => Math.max(prev - 1, 1))



    }
    const handleNext = (page: number) => {
        console.log("next")
        setPage((prev) => Math.min(prev + 1, Math.floor(todos.length / itemPerPage)))

    }

    console.log(todos)

    return (

        <>
            <div className='flex mb-4 justify-center'>
                <form onSubmit={handleSubmit}>
                    <input required className='border-1 border-black ' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" />
                    <button className='rounded bg-blue-600 text-white px-2 py-1 mx-2' type='submit'>{editingId ? "save" : "add"}</button>
                </form>
            </div>
            <div className='w-[60vw] mx-auto'>
                {todos.map((todo) => (
                    <div key={todo.id} className='flex justify-between mt-2 px-4 py-2 rounded border-1 border-black '>
                        <div>{todo.id}</div>
                        <div>{todo.title}</div>
                        <div><input checked={todo.completed} onChange={() => toggleTodo(todo.id)} type="checkbox" /></div>
                        <div className='flex '>
                            <div className='mx-4'> <Pencil onClick={() => handleEdit(todo.id, todo.title)}></Pencil> </div>
                            <div><Trash onClick={() => deleteTodo(todo.id)}></Trash></div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default TodoList