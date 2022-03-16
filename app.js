import express from "express";
import cors from 'cors';
import authRouter from './src/auth-back/auth/auth.router.js'
import userRouter from './src/auth-back/users/users.router.js'
import { validateAuth } from "./src/auth-back/auth/auth.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/auth', authRouter);
app.use('/user', validateAuth, userRouter);


app.listen(port, () => console.log(`server listening on port ${port}`));