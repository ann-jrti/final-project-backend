import { db } from "../../database/index.js"

const ARTWORK_COLLECTION = 'users-artworks';

export const createUserArtwork = async (artwork) => {
    try {
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        return await usersArtworks.insertOne(artwork);
    } catch (err) {
        log.error(err);
    }
}

export const retrieveArtworkByFileName = async (filename) => {
    try {
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        const query = { filename }
        return await usersArtworks.findOne(query);
    } catch (err) {
        log.error(err);
    }
}

export const retrieveArtworksByUserEmail = async (email) => {
    try {
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        const query = { email }
        log.info('model', email);
        const artwork = await usersArtworks.find(query).toArray();
        return artwork ?? undefined;
    } catch (err) {
        log.error(err);
    }
}

export const retrieveArtworkById = async (id) => {
    try {
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        const query = { id }
        log.info('artwork id', id);
        const artwork = await usersArtworks.findOne(query);
        return artwork ?? undefined;
    } catch (err) {
        log.error(err);
    }
}

export const deleteArtwork = async (artwork) => {
    try {
        const usersArtworks = db.collection(ARTWORK_COLLECTION);
        await usersArtworks.deleteOne(artwork);
    } catch (err) {
        log.error(err);
    }
}