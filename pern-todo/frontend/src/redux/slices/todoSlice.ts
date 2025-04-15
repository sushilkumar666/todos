import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodo {
    id: string,
    title: string,
    completed: boolean,
    userId: string
}

interface TodoState {
    todos: ITodo[]
}

const initialState: TodoState = {
    todos: [{ id: "1", title: "titl1", completed: false, userId: "12343" }]
}

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {

        setTodo: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = [...action.payload]
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload)
        },

        updateTodo: (state, action: PayloadAction<{ newTitle: string, id: string }>) => {
            const { newTitle, id } = action.payload;
            state.todos = state.todos.map((todo) => (todo.id == id ? { ...todo, title: newTitle } : todo));
        },

        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },

        toggleTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.map((todo) => todo.id == action.payload ? { ...todo, completed: !todo.completed } : todo)
        }

    }

})

export const { addTodo, updateTodo, deleteTodo, toggleTodo, setTodo } = todoSlice.actions;

export default todoSlice.reducer;