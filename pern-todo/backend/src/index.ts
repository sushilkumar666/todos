import express, { Request, Response, urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PrismaClient } from './generated/prisma';
import todoRoutes from './routes/todo.route'
import userRoutes from './routes/user.routes'

const app = express();
export const prisma = new PrismaClient();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/todo', todoRoutes)

app.get('/test', (req: Request, res: Response) => {
    res.json({
        message: "test successfull"
    })
})
app.listen(3000, () => console.log('server is listening on port 3000'))

