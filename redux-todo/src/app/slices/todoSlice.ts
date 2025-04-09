import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[]
};

const initialState: TodoState = {
    todos: [{
        id: 0,
        title: 'Buy milk',
        completed: false
    }]
}



const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = [...state.todos, action.payload]
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo);
        },
        saveTodo: (state, action: PayloadAction<{ id: number, newText: string }>) => {
            const { id, newText } = action.payload;
            state.todos = state.todos.map((todo) => todo.id === id ? { ...todo, title: newText } : todo)
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo, saveTodo } = todoSlice.actions;
export default todoSlice.reducer;