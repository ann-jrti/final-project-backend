import { loggerMiddleware } from './src/logger/index.js'
import express from "express";
import cors from 'cors';
import authRouter from './src/auth-back/auth/auth.router.js'
import userRouter from './src/auth-back/users/users.router.js'
import artworkRouter from './src/auth-back/artwork/artwork.router.js'
import { validateAuth } from "./src/auth-back/auth/auth.middleware.js";
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/auth', authRouter);
app.use('/artwork', artworkRouter);
app.use('/users', validateAuth, userRouter);

app.listen(port, () => log.info(`server listening on port ${port}`));