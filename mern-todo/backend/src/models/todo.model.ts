import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo extends Document {
    title: string,
    completed: boolean,
    userId: Types.ObjectId;
}

const todoSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const Todo = mongoose.model('Todo', todoSchema);

export default Todo