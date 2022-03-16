import { createUser } from "../users/users.model.js";
import { createValidationToken } from "./auth.model.js";
import { generateValidationToken } from "./auth.utils.js";
import { sendValidationEmail } from "../../adapters/email.js";

export const registerCtrl = async (req, res) => {
    try {
        await createUser(req.body); // creates user and saves it in database
        const token = generateValidationToken(); // generates token;
        await createValidationToken(token, req.body.email); // saves it in db and ties token to user
        sendValidationEmail(req.body.email, `http://localhost:3000/validate?token=${token}`);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const validateEmailCtrl = (req, res) => {
    res.sendStatus(200);
}

export const loginCtrl = (req, res) => {
    res.sendStatus(201);
}