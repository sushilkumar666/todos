import React, { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, setTodo, deleteTodo, updateTodo, toggleTodo } from '../redux/slices/todoSlice';
import { RootState, AppDispatch } from '../redux/store';
import axios from 'axios';


function TodoList() {

    interface ITodo {
        id: string,
        userId: string,
        title: string,
        completed: boolean
    }

    const dispatch = useDispatch<AppDispatch>();

    const [editId, setEditId] = useState<string>("");
    // const [todos, setTodos] = useState(useSelector((state: RootState) => (state.todoSlice.todos)));
    // const [todos, setTodos] = useState<ITodo[]>([]);

    const todos = useSelector((state: RootState) => state.todoSlice.todos);
    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editId) {
            const newTodo = await axios.patch(`http://localhost:3000/api/todo/updatetodo/${editId}`, { title: inputValue }, { withCredentials: true })
            dispatch(updateTodo({ newTitle: inputValue, id: editId }))
        } else {
            const { data } = await axios.post(`http://localhost:3000/api/todo/addtodo`, { title: inputValue }, { withCredentials: true })
            console.log(data)
            if (data.success) {
                console.log('todo added successsfully')
            }
            dispatch(addTodo(data.data))
        }
        setInputValue("")
    }

    const handleEdit = (id: string, title: string) => {

        setEditId(id);
        setInputValue(title);

    }
    const handleDelete = async (id: string) => {
        console.log("deletetodo clicked" + id)
        const { data } = await axios.delete(`http://localhost:3000/api/todo/deletetodo/${id}`, { withCredentials: true })
        console.log(data)
        if (data.success) {
            console.log('todo added successsfully')
            dispatch(deleteTodo(id))
        }
        // console.log(todos)
    }

    const handleToggle = async (id: string) => {
        const { data } = await axios.patch(`http://localhost:3000/api/todo/toggletodo/${id}`, {}, { withCredentials: true })
        dispatch(updateTodo({ newTitle: inputValue, id: editId }))

        if (data.success) {
            dispatch(toggleTodo(id))
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const { data } = await axios.get(`http://localhost:3000/api/todo/fetchtodo`, { withCredentials: true })
            console.log(data)
            if (data.success) {

                dispatch(setTodo(data.data))
            }
        }
        fetchTodos();

    }, [])

    return (
        <>
            <div>TodoList</div>
            <form onSubmit={handleSubmit}>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='border-1 border-white' type="text" />
                <button type='submit' className='bg-blue-600 text-white rounded-sm mx-2 py-1 px-2 '>Add</button>
            </form>

            <table className='border-1 border-white w-[60vw] ' >
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td className='border-1 border-white '>{todo.title}</td>
                            <td className='border-1 border-white '><input onClick={() => handleToggle(todo.id)} checked={todo.completed} type="checkbox" /></td>
                            <td className='border-1 border-white  '><Pencil onClick={() => handleEdit(todo.id, todo.title)} className='mx-auto' size={20} /></td>
                            <td className='border-1 border-white '><Trash2 onClick={() => handleDelete(todo.id)} className='mx-auto' size={20} /></td>
                        </tr>
                    ))}


                </tbody>
            </table>


        </>
    )
}

export default TodoList