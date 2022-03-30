import { db } from "../../database/index.js"
import { getPlayerOfferByPlayerEmail } from "../players-pool/players-pool.model.js";
const USERS_COLLECTION = 'users';
const CUSTOM_PROFILES_COLLECTION = 'users-custom-profiles';
const PLAYERS_POOL_COLLECTION = 'players-pool';
const ARTWORK_COLLECTION = 'users-artworks';


export const createUser = async (user) => {
    try {
        const users = db.collection(USERS_COLLECTION);
        return await users.insertOne(user);
    } catch (err) {
        log.info(err);
    }
}

// returns user if exists
export const getUserByEmailNoStatus = async (email) => {
    try {
        const users = db.collection(USERS_COLLECTION);
        return await users.findOne({ email });
    } catch (err) {
        log.error(err);
    }
}

// updates user data changing status to success
export const updateValidUser = async (email) => {
    try {
        const users = db.collection(USERS_COLLECTION);
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            }
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        log.error(err);
    }
}

// returns user in ddbb with success status if email and password matches
export const retrieveSuccessUserByEmailAndPassword = async (email, password) => {
    try {
        const users = db.collection(USERS_COLLECTION);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        log.error(err);
    }
}
export const retrieveUserInfoByEmail = async (email) => {
    try {
        const users = db.collection(USERS_COLLECTION);
        const query = { email };
        return await users.findOne(query);
    } catch (err) {
        log.error(err);
    }
}

export const createLolProfile = async (stats, email) => {
    try {
        const customProfiles = db.collection(CUSTOM_PROFILES_COLLECTION);
        const query = { email };
        const isThereCustomProfile = await customProfiles.findOne(query)
        if (isThereCustomProfile === null) {
            return await customProfiles.insertOne(stats);
        } else {
            const newStats = stats;
            return await customProfiles.replaceOne(isThereCustomProfile, newStats);
        }

    } catch (err) {
        log.error('Create lol profile error: ', err);
    }
}

export const retrieveCustomLolProfile = async (email) => {
    try {
        const customLolProfile = db.collection(CUSTOM_PROFILES_COLLECTION);
        const query = { email };
        // const options = { projection: { _id: 0, password: 0, status: 0 } }
        return await customLolProfile.findOne(query);
    } catch (err) {
        log.error(err);
    }
}

export const updateCustomProfileStatus = async (email) => {
    try {
        const users = db.collection(USERS_COLLECTION);
        const updateDoc = {
            $set: {
                customProfile: true
            }
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        log.error(err);
    }
}

export const retrieveDataCustomLolProfile = async (email) => {
    try {
        const customLolProfile = db.collection(CUSTOM_PROFILES_COLLECTION);
        const query = { email };
        // const options = { projection: { _id: 0, password: 0, status: 0 } }
        return await customLolProfile.findOne(query);
    } catch (err) {
        log.error(err);
    }
}

export const deleteUserAccount = async (email) => {
    console.log('on delete user account')
    try {
        const users = db.collection(USERS_COLLECTION);
        const query = { email };
        // await customProfiles.findOne(query)
        await users.deleteOne(query);

    } catch (err) {
        log.error('Create lol profile error: ', err);
    }
}

export const deleteCustomProfile = async (email) => {
    console.log('on delete custom profile');
    try {
        const customProfiles = db.collection(CUSTOM_PROFILES_COLLECTION);
        const query = { email };
        console.log('query', query)

        await customProfiles.deleteOne(query);
    } catch (err) {
        log.error('Create lol profile error: ', err);
    }
}

export const deleteActiveOffer = async (email) => {
    try {
        console.log('on delete active offer');
        const playerOffers = db.collection(PLAYERS_POOL_COLLECTION);
        const query = { email };
        console.log('query', query)
        // await customProfiles.findOne(query)
        await playerOffers.deleteOne(query);
    } catch (err) {
        log.error('Create lol profile error: ', err);
    }
}

export const deleteUserArtworks = async (email) => {
    try {
        console.log('on delete artworks');
        const artworks = db.collection(ARTWORK_COLLECTION);
        const query = { email };
        console.log('query', query)
        // await customProfiles.findOne(query)
        await artworks.deleteOne(query);
    } catch (err) {
        log.error('Create lol profile error: ', err);
    }
}