import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route'
import todoRoutes from './routes/todo.route'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173", // frontend ka exact URL
        credentials: true,
    }
));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


dotenv.config();

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes)

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "api test successs"
    })
})


app.listen(3000, () => console.log("server is listening on port 3000"))