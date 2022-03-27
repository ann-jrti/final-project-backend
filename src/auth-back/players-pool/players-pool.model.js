import { db } from "../../database/index.js";
const PLAYERS_POOL_COLLECTION = 'players-pool';

export const createPlayerOffer = async (playerOffer) => {
    try {
        const playersPool = db.collection(PLAYERS_POOL_COLLECTION);
        return await playersPool.insertOne(playerOffer);
    } catch (err) {
        log.error(err);
    }
}
