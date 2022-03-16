//connects with database to read users collection
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { DB_PW } = process.env;
const URI = `mongodb+srv://andrea:${DB_PW}@cluster0.s9dbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(URI);

const DATABASE_NAME = 'ann-final-project';
const COLLECTION_NAME = 'users';

export const createUser = async (user) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.insertOne(user);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

// returns user if exists
export const getUserByEmailNoStatus = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.findOne({ email });
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

// updates user data changing status to success
export const updateValidUser = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            }
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

// returns user in ddbb with success status if email and password matches
export const retrieveSuccessUserByEmailAndPassword = async (email, pw) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export const retrieveUserInfoByEmail = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = { email };
        const options = { projection: { _id: 0, password: 0 } };
        return await users.findOne(query, options);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}