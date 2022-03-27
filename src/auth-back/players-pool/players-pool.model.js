import { db } from "../../database/index.js";
const PLAYERS_POOL_COLLECTION = 'players-pool';
const CUSTOM_LOL_PROFILES = 'users-custom-profiles';

export const createPlayerOffer = async (playerOffer) => {
    try {
        const playersPool = db.collection(PLAYERS_POOL_COLLECTION);
        return await playersPool.insertOne(playerOffer);
    } catch (err) {
        log.error(err);
    }
}

export const getAllPlayersOffers = async () => {
    try {
        const playersPool = db.collection(PLAYERS_POOL_COLLECTION);
        const query = {}
        log.info(query);
        const allPlayersOffers = await playersPool.find(query).toArray();
        return allPlayersOffers ?? undefined;
    } catch (err) {
        log.error(err);
    }
}

export const getAllCustomProfiles = async () => {
    try {
        const customProfiles = db.collection(CUSTOM_LOL_PROFILES);
        const query = {}
        log.info(query);
        const allCustomProfiles = await customProfiles.find(query).toArray();
        return allCustomProfiles ?? undefined;
    } catch (err) {
        log.error(err);
    }
}