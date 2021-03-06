import { db } from "../../database/index.js";
const PLAYERS_POOL_COLLECTION = 'players-pool';
const CUSTOM_LOL_PROFILES = 'users-custom-profiles';

export const createPlayerOffer = async (playerOffer, email) => {
    try {
        const playersPool = db.collection(PLAYERS_POOL_COLLECTION);
        const query = { email }
        const isTherePlayerOffice = await playersPool.findOne(query);
        if (isTherePlayerOffice === null) {
            return await playersPool.insertOne(playerOffer);
        } else {
            const newEdit = playerOffer
            return await playersPool.replaceOne(isTherePlayerOffice, newEdit);
        }

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

export const getPlayerOfferByPlayerEmail = async (email) => {
    try {
        const playersPool = db.collection(PLAYERS_POOL_COLLECTION);
        const query = { email };
        log.info(query);
        const playerOffer = await playersPool.findOne(query);
        return playerOffer ?? undefined;
    } catch (err) {
        log.error(err);
    }
}