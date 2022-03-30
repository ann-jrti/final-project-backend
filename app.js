import { } from 'dotenv/config';
import { loggerMiddleware } from './src/logger/index.js'
import { connectDB } from './src/database/index.js'
import express from "express";
import cors from 'cors';
import authRouter from './src/auth-back/auth/auth.router.js'
import userRouter from './src/auth-back/users/users.router.js'
import artworkRouter from './src/auth-back/artwork/artwork.router.js'
import { validateAuth } from "./src/auth-back/auth/auth.middleware.js";
import bodyParser from 'body-parser';
import playersPoolRouter from './src/auth-back/players-pool/players-pool.router.js'

const app = express();
const port = process.env.PORT || 4000;

connectDB()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(loggerMiddleware);

app.use('/auth', authRouter);
app.use('/artwork', validateAuth, artworkRouter);
app.use('/users', validateAuth, userRouter);
app.use('/players-pool', playersPoolRouter);

app.listen(port, () => log.info(`server listening on port ${port}`));