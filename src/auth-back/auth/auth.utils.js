import crypto from 'crypto';

const salt = 'its_a_777733222777338';

export const encodePassword = (pw) => {
    // encodes password
    return crypto.pbkdf2Sync(pw, salt, 1000, 64, `sha512`).toString(`hex`);
}

export const generateValidationToken = () => {
    return crypto.randomBytes(128).toString('hex');
}