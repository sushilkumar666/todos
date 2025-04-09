import React, { useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../config';

function TodoList() {

    const [inputValue, setInputValue] = useState<string>("");
    const [editingId, setEditingId] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (editingId) {
            const data = await axios.patch(`${BACKEND_URL}/api/todo/updatetodo/${editingId}`, { title: inputValue });
            console.log(data);
        } else {
            const data = await axios.post(`${BACKEND_URL}/api/todo/createTodo/`, { title: inputValue });
            console.log(data);
        }
        console.log("handlesubmit ")
        setInputValue("")
    }

    return (
        <form className='flex justify-center my-6' onSubmit={handleSubmit}>
            <div><input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='border-1 focus:outline-none py-1 border-blue-400 rounded focus:border-blue-600 ' type="text" /></div>
            <div><button type='submit' className='bg-blue-600 text-white px-2 py-1 mx-2 rounded-sm'>{editingId ? 'save' : 'add'} </button></div>
        </form>
    )
}

export default TodoList