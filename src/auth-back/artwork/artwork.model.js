import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const { DB_PW } = process.env;
const URI = `mongodb+srv://andrea:${DB_PW}@cluster0.s9dbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(URI);

const DATABASE_NAME = 'ann-final-project';
const ARTWORK_COLLECTION = 'users-artworks';

export const createUserArtwork = async (artwork) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        return await usersArtworks.insertOne(artwork);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export const retrieveArtworkByFileName = async (filename) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        const query = { filename }
        return await usersArtworks.findOne(query);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

export const retrieveArtworksByUserToken = async (token) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        const query = { token }
        console.log('model', token);
        const artwork = await usersArtworks.find(query).toArray();
        return artwork ?? undefined;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

