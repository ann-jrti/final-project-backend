import express from "express";
import { registerCtrl, validateEmailCtrl, loginCtrl } from "./auth.controller.js";
import { validateUser } from "./auth.middleware.js";

const router = express.Router();

//endpoint to user register
router.post('/register', validateUser, registerCtrl)

//enpoint to validate user email
router.post('/validate', validateEmailCtrl)

//enpoint for user to login
router.post('/login', loginCtrl)

export default router;