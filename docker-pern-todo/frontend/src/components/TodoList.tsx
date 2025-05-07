import { useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Trash2 } from 'lucide-react';

function TodoList() {

    interface ITodo {
        id: number,
        title: string,
        completed: boolean,
    }

    const [todos, setTodos] = useState<ITodo[]>([{ id: 1000, title: "test1", completed: false }]);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {

        const getTodos = async () => {
            const { data } = await axios.get(`${BACKEND_URL}/api`)
            // setTodos(d);
            // console.log(data.data);
            if (data.success) {
                setTodos([...data.data]);
            }
        }
        getTodos();
    }, [])

    async function onSubmit(e: any) {
        e.preventDefault();
        const { data } = await axios.post(`${BACKEND_URL}/api/`, { title: inputValue });
        setTodos((prev) => ([...prev, { id: data.data.id, title: inputValue, completed: false }]));
        setInputValue("")
    }

    async function deleteTodo(id: number) {
        const { data } = await axios.delete(`${BACKEND_URL}/api/${id}`);
        console.log(data)
        if (data.success) {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    }

    return (
        <>

            <form className='flex mt-2 justify-center' onSubmit={onSubmit}>

                <input value={inputValue} className='outline-blue-200 border-blue-500' onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Add Todo' />
                <button className='bg-blue-500 px-4 py-1 text-white rounded mx-2' type='submit'>add</button>


            </form>
            <div>TodoList</div>
            {
                todos.map(todo => (
                    <div className='flex justify-center '>
                        <div className='text-left border-pink-800 border-1'>{todo.title}</div>
                        <div><Trash2 onClick={() => deleteTodo(todo.id)} size={15} /></div>
                    </div>
                ))

            }
        </>
    )

}

export default TodoList