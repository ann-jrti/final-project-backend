import { db } from "../../database/index.js"

const COLLECTION_NAME = 'token-validation';

export const createValidationToken = async (token, userName) => {
    try {
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.insertOne({
            token,
            user: userName
        });
    } catch (err) {
        log.error(err);
    }
}

export const retrieveValidationToken = async (token) => {
    try {
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.findOne({ token });
    } catch (err) {
        log.error(err);
    }
}

export const deleteValidationToken = async (token) => {
    try {
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.deleteOne({ token });
    } catch (err) {
        log.info(err);
    }
}