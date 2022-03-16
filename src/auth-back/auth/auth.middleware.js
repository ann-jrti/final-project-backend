import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength';

/**
 * Validate that email is correct
 * If email is not valid, we send 400
 */

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