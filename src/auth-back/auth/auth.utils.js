import crypto from 'crypto';


export const generateValidationToken = () => {
    return crypto.randomBytes(128).toString('hex');
}