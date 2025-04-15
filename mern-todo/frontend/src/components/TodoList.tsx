import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../context/UserProvider';

function TodoList() {

    interface ITodo {
        _id: string,
        title: string,
        completed: boolean,
        userId: string
    }

    const [inputValue, setInputValue] = useState<string>("");
    const [editingId, setEditingId] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>([])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (editingId) {
            const data = await axios.patch(`${BACKEND_URL}/api/todo/updatetodo/${editingId}`, { title: inputValue }, { withCredentials: true });
            const updatedTodos = todos.map((todo) => (todo._id == editingId ? { ...todo, title: inputValue } : todo))
            setTodos(updatedTodos)
            console.log(data);
        } else {
            const data = await axios.post(`${BACKEND_URL}/api/todo/createtodo/`, { title: inputValue }, { withCredentials: true });
            const updatedTodos = [...todos, { _id: Math.random().toString(), title: inputValue, completed: false, userId: "34234" }];
            setTodos(updatedTodos);
            console.log(data);
        }

        setInputValue("")
    }

    const handleEdit = (id: string, title: string) => {
        setInputValue(title);
        setEditingId(id)
    }

    const handleDelete = async (id: string) => {
        const deletedTodo = await axios.delete(`${BACKEND_URL}/api/todo/deletetodo/${id}`, { withCredentials: true });
        const updatedTodos = todos.filter((todo) => (todo._id !== id));
        setTodos(updatedTodos)
        // console.log(deletedTodo);
    }

    const handleChecked = async (id: string) => {
        const data = await axios.patch(`${BACKEND_URL}/api/todo/toggletodo/${id}`, {}, { withCredentials: true });
        const updatedTodos = todos.map((todo) => (todo._id == id ? { ...todo, completed: !todo.completed } : todo))
        setTodos(updatedTodos)
        console.log(data);
    }


    useEffect(() => {

        const handleInitialFetch = async () => {
            const { data } = await axios.get(`${BACKEND_URL}/api/todo/`, { withCredentials: true });
            // console.log(JSON.stringify(data.data) + " this is value of todo")

            setTodos(data.data)
        }
        handleInitialFetch()
        console.log(JSON.stringify(todos) + " this is todos value")

    }, [])

    return (
        <div className='bg-black w-[100vw] h-[100vh] text-white'>

            <form className='flex justify-center my-6' onSubmit={handleSubmit}>
                <div><input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='border-1 focus:outline-none py-1 border-blue-400 rounded focus:border-blue-600 ' type="text" /></div>
                <div><button type='submit' className='bg-blue-600 text-white px-2 py-1 mx-2 rounded-sm'>{editingId ? 'save' : 'add'} </button></div>
            </form>

            <table cellPadding={4} cellSpacing={4} className=' mx-auto w-[60vw]  border-1 border-black '>
                <tbody>
                    {todos?.map((todo) => (
                        <tr>
                            <td className="border border-black p-2">{todo.title} </td>
                            <td className="border border-black p-2"><input checked={todo.completed} onClick={() => handleChecked(todo._id)} type="checkbox" /></td>
                            <td className="border border-black p-2"><Pencil onClick={() => handleEdit(todo._id, todo.title)} size={20} /></td>
                            <td className="border border-black p-2"><Trash2 onClick={() => handleDelete(todo._id)} size={20} /></td>
                        </tr>
                    ))}
                </tbody>
            </table >


        </div >
    )
}


export default TodoList