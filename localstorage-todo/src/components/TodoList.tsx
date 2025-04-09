import React, { useEffect, useState } from 'react'
import { Pencil, Trash } from 'lucide-react';
function TodoList() {

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    }
    todos.push(newTodo);
  }

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const editTodo = (id: number, newText: string) => {
    const newTodos = todos.map((todo) => (
      todo.id === id ? { ...todo, title: newText } : todo
    ))
    setTodos(newTodos);
  }


  useEffect(() => {
    let todos = localStorage?.getItem('todos');
    if (!todos) {
      console.log("todos not found")
      return;
    }
    setTodos(JSON.parse(todos))
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (editingId) {
      editTodo(editingId, inputValue);
      setEditingId(null);
      setInputValue("")
    }
    else {
      addTodo(inputValue);
      setInputValue("")
    }
  }

  const handleEdit = (id: number, title: string) => {
    setEditingId(id);
    setInputValue(title);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <div>
      <div className='flex justify-center my-4'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='border-1 border-black' type="text" />
          <button type='submit' className='bg-blue-600 text-white px-2 py-1 rounded-sm mx-2'>Add</button>
        </form>
      </div>
      {todos.map((todo) => (
        <div className='flex my-2 justify-between w-[60vw] mx-auto border-blue-600 border-1 px-4 py-2 rounded-sm'>
          <div>{todo.title}</div>
          <div><input disabled={todo.completed} type="checkbox" /></div>
          <div onClick={() => handleEdit(todo.id, todo.title)} ><Pencil size={20} /></div>
          <div onClick={() => deleteTodo(todo.id)}><Trash size={20} /></div>
        </div>
      ))}

    </div>
  )
}

export default TodoList