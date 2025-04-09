
// persistance storge 

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface Todo {
//     id: number;
//     title: string;
//     completed: boolean;
// }
// interface StoreType {
//     todos: Todo[],
//     addTodo: (title: string) => void;
//     deleteTodo: (id: number) => void;
//     updateTodo: (id: number, newTitle: string) => void,
//     toggleTodo: (id: number) => void;
//     previous: (page: number) => void;
//     next: (page: number) => void;
// }

// const useTodoStore = create<StoreType>()(
//     persist(
//         (set) => ({
//             todos: [{ id: 1, title: "title1", completed: false }],

//             addTodo: (title) => (
//                 set((state) => ({
//                     todos: [...state.todos, { id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1, title, completed: false }]
//                 })
//                 )),

//             deleteTodo: (id) => (
//                 set((state) => ({
//                     todos: state.todos.filter(todo => todo.id !== id)
//                 }))
//             ),

//             updateTodo: (id, newTitle) => (
//                 set((state) => {
//                     return { todos: state.todos.map(todo => todo.id == id ? { ...todo, title: newTitle } : todo) }
//                 })
//             ),

//             toggleTodo: (id) => (
//                 set((state) => (
//                     { todos: state.todos.map(todo => todo.id == id ? { ...todo, completed: !todo.completed } : todo) }
//                 ))
//             ),

//             previous: (page) => (
//                 set((state) => (
//                     { todos: state.todos.slice(page - 1 * 5, page * 5) }
//                 ))
//             ),

//             next: (page) => {
//                 set((state) => (
//                     { todos: state.todos.slice(page - 1 * 5, page * 5) }
//                 ))
//             }

//         }),

//         {
//             name: 'zustand-todo-storage', // ✅ PERSIST KEY (localStorage)
//         }
//     )

// );

// export default useTodoStore;









// no persistance Storage

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
interface StoreType {
    todos: Todo[],
    currentPage: number;
    itemsPerPage: number;
    addTodo: (title: string) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, newTitle: string) => void,
    toggleTodo: (id: number) => void;


}

const useTodoStore = create<StoreType>(

    (set, get) => ({
        todos: [{ id: 1, title: "title1", completed: false }],
        currentPage: 1,
        itemsPerPage: 5,

        get paginatedTodos() {
            const { todos, currentPage, itemsPerPage } = get();
            const start = (currentPage - 1) * itemsPerPage;
            return todos.slice(start, start + itemsPerPage);
        },

        addTodo: (title) => (
            set((state) => ({
                todos: [...state.todos, { id: state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1, title, completed: false }]
            })
            )),


        deleteTodo: (id) => (
            set((state) => ({
                todos: state.todos.filter(todo => todo.id !== id)
            }))
        ),

        updateTodo: (id, newTitle) => (
            set((state) => {
                return { todos: state.todos.map(todo => todo.id == id ? { ...todo, title: newTitle } : todo) }
            })
        ),

        toggleTodo: (id) => (
            set((state) => (
                { todos: state.todos.map(todo => todo.id == id ? { ...todo, completed: !todo.completed } : todo) }
            ))
        ),



    }),


);

export default useTodoStore;