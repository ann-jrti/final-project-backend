import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

// check if email is valid. If so next, if not we send 400
export const validateUser = (req, res, next) => {
    const { email, password } = req.body;
    const validEmail = EmailValidator.validate(email);
    const userPassword = passwordStrength(password).value;
    const validPassword = (userPassword === 'Medium' || userPassword === 'Strong') ? true : false;
    if (validEmail && validPassword) {
        next();
    }
    else {
        if (!validEmail) res.status(400).json({ error: 'Email is not valid' })
        if (!validPassword) res.status(400).json({
            error: 'Your password is too weak. Please make sure you include at least: one number, one uppercase letter and one special character.'
        })
    }
}

export const validateAuth = (req, res, next) => {
    try {
        const auth = req.header('Authorization'); //obtains email from token
        log.info(auth);
        const token = auth.split(' ')[1]; //get header
        log.info(token);
        const payload = jwt.verify(token, JWT_SECRET); //we obtain token
        log.info(payload);
        req.email = payload.email;// we add attribute to the requeset
        log.info(req.email, payload.email);
        next();
    } catch (err) {
        //token is not valid or there is no token
        console.error(err);
        res.sendStatus(401);
    }
}