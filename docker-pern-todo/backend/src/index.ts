import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import todoRouter from './routes/todo.route'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', todoRouter);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "test successful"
    })
})

app.listen(8080, () => { console.log("app is listening on port 8080") });