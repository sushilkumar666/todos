import React, { useContext, useState } from 'react'
import { TodoContext, useTodo } from '../context/todoContext'
import TodoItem from './TodoItem';
import { useForm, FormProvider } from 'react-hook-form';

function TodoList() {

    const { todos, page, prevPage, nextPage, addTodo, updateTodo } = useTodo();
    const [editing, setEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);


    interface FormData {
        newTodo: string
    }

    const methods = useForm<FormData>();

    const onSubmit = (data: { newTodo: string }) => {
        console.log(data);
        if (editing) {
            if (!editingId) return;
            updateTodo(editingId, data.newTodo);
            setEditing(false);
            setEditingId(null);
        }
        else {
            addTodo(data.newTodo);
        }
        methods.reset();
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='flex justify-center mt-4'><input {...methods.register("newTodo")} className='border-red-500 border-1 rounded-sm px-2 mx-2' type="text" placeholder='Add new todo' />
                        <button type='submit' className='bg-blue-600 text-white px-2 py-1 rounded-sm'>{editing ? "Save" : "Add"}</button>
                    </div>
                </form>

                <div className='w-[60vw] mx-auto  mt-5'>
                    {todos.slice((page - 1) * 10, page * 10).map((todo: any) => (
                        <TodoItem setEditing={setEditing} setEditingId={setEditingId} todo={todo} key={todo.id} />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <button className='bg-blue-600 text-white rounded-sm px-2 py-1' onClick={prevPage} disabled={page === 1}>Prev</button>
                    <span className='mx-2'> {page}</span>
                    <button className='bg-blue-600 text-white rounded-sm px-2 py-1' onClick={nextPage} disabled={page * 10 >= todos.length}>Next</button>
                </div>
            </FormProvider>
        </div >

    )
}

export default TodoList