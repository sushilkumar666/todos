import { createContext, useContext, ReactNode, useState } from "react";


export interface Todo {
    id: number,
    title: string,
    completed: boolean
}

interface TodoContextType {
    todos: Todo[];
    page: number;
    addTodo: (title: string) => void;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void;
    prevPage: () => void;
    nextPage: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used inside TodoProvider");
    }
    return context;
};

const TodoProvider = ({ children }: { children: React.ReactNode }) => {

    const [todos, setTodos] = useState<Todo[]>([{ id: 1, title: "title1", completed: false }]);
    const [page, setPage] = useState<number>(1);

    const addTodo = (title: string) => {
        setTodos((prev) => ([...prev, { id: todos.length ? todos[todos?.length - 1].id + 1 : 1, title: title, completed: false }]));
    }

    const deleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    const toggleTodo = (id: number) => {
        setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    const updateTodo = (id: number, newText: string) => {
        setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title: newText } : todo)));
    }

    const nextPage = () => {
        setPage((page) => Math.min(page + 1, Math.ceil(todos.length / 10)));
    }

    const prevPage = () => {
        setPage((page) => Math.max(page - 1, 1));
    }

    return (
        <TodoContext.Provider value={{ todos, page, addTodo, deleteTodo, toggleTodo, updateTodo, prevPage, nextPage }}>
            {children}
        </TodoContext.Provider>)
}

export default TodoProvider;