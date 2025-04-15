import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addTodo } from "@/app/slices/todoSlice"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2, Edit2, Save } from 'lucide-react'
import { deleteTodo, Todo, toggleTodo, saveTodo } from '@/app/slices/todoSlice'

import {
    Pagination,
    PaginationContent,
    // PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


interface TodoTableProps {
    resultsPerPage: number,
}

const TodoTable: React.FC<TodoTableProps> = ({ resultsPerPage }) => {


    const response = useSelector((state: RootState) => state.todoSlice.todos);;
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState(1);
    const [data, setData] = useState<Todo[]>([]);
    const totalResults = response.length;
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const handleEdit = (id: number, text: string) => {
        setEditingId(id);
        setEditText(text);
    };

    //@ts-ignore
    function onPageChange(p) {
        setPage(p);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
        console.log(e.target.value)
        console.log(editText + " i am edit ext")
    };

    const saveEdited = (id: number) => {
        dispatch(saveTodo({ id: id, newText: editText }))
        setEditingId(null);
    }

    const todos = useSelector((state: RootState) => state.todoSlice.todos);

    const formSchema = z.object({
        title: z.string().min(3, {
            message: "title must be at least 3 characters.",
        }),
    })

    const { handleSubmit, register, reset, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })


    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        let id = todos[todos.length - 1].id + 1;
        let todo = {
            id: id,
            title: values.title,
            completed: false
        }

        reset();

        dispatch(addTodo(todo));
        console.log(todo)
    }

    useEffect(() => {
        // If Filters Applied

        // if filters dosent applied
        if (true) {
            setData(
                response.slice((page - 1) * resultsPerPage, page * resultsPerPage)
            );
        }
    }, [page, resultsPerPage, todos]);

    return (
        <>
            <div >

                <div className="flex justify-center my-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex">
                            <div className="flex flex-col">
                                <input className="border-1 border-red-500 py-1 mx-2 focus:outline-none focus:border-blue-500 rounded" {...register("title", { required: true })} type="text" />
                                {errors.title && <span className="text-sm text-red-500">{errors.title.message}</span>}
                            </div>
                            <div>
                                <button className=" px-2 py-1 bg-blue-500 text-white rounded-sm">submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div >
            <Table className='w-[70vw] mx-auto'>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>title</TableHead>
                        <TableHead>status</TableHead>
                        <TableHead >Update</TableHead>
                        <TableHead >Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell className="font-medium">{todo.id}</TableCell>
                            <TableCell>  {todo.id === editingId ? <input onClick={() => dispatch(toggleTodo(todo.id))} onChange={handleChange} value={editText} /> : todo.title}</TableCell>
                            <TableCell><input onChange={() => dispatch(toggleTodo(todo.id))} type="checkbox" checked={todo.completed} /></TableCell>
                            <TableCell > {todo.id === editingId ? <Save onClick={() => saveEdited(todo.id)} /> :
                                <Edit2 onClick={() => handleEdit(todo.id, todo.title)} size={20} />} </TableCell>
                            <TableCell onClick={() => dispatch(deleteTodo(todo.id))} ><Trash2 size={20} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow >
                        <TableCell colSpan={100} className="text-center ">
                            <Pagination>
                                <PaginationContent>
                                    {/* Previous Button */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {/* Dynamic Page Numbers */}
                                    {Array.from({ length: Math.ceil(totalResults / resultsPerPage) }, (_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href="#"
                                                isActive={page === i + 1}
                                                onClick={() => setPage(i + 1)}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {/* Next Button */}
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(totalResults / resultsPerPage)))}
                                            className={page === Math.ceil(totalResults / resultsPerPage) ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}

export default TodoTable