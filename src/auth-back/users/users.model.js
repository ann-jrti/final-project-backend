//connects with database to read users collection
import { MongoClient } from "mongodb";

const URI = 'mongodb+srv://andrea:maso@cluster0.s9dbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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