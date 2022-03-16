import express from "express"
import { retrieveUserInfoByEmail } from "./users.model.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

export const getUserInfo = async (req, res) => {
    const auth = req.header('Authorization');
    const token = auth.split(' ')[1]; // get token from string
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await retrieveUserInfoByEmail(payload.email);
    res.json(user)
}