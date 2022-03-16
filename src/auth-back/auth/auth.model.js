//connects with database to read validate token collection
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { DB_PW } = process.env;
const URI = `mongodb+srv://andrea:${DB_PW}@cluster0.s9dbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(URI);

const DATABASE_NAME = 'ann-final-project';
const COLLECTION_NAME = 'token-validation';

export const createValidationToken = async (token, userName) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.insertOne({
            token,
            user: userName
        });
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export const retreveValidationToken = async (token) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.findOne({ token });
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export const deleteValidationToken = async (token) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const tokens = db.collection(COLLECTION_NAME);
        return await tokens.deleteOne({ token });
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}