import { db } from "../../database/index.js"
const USERS_COLLECTION = 'users';
const CUSTOM_PROFILES_COLLECTION = 'users-custom-profiles';



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
        const options = { projection: { _id: 0, password: 0, status: 0 } }
        return await users.findOne(query, options);
    } catch (err) {
        log.error(err);
    }
}

export const createLolProfile = async (stats) => {
    try {
        const customProfiles = db.collection(CUSTOM_PROFILES_COLLECTION);
        await customProfiles.insertOne(stats)
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