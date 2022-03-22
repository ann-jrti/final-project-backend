import { retrieveUserInfoByEmail, createLolProfile } from "./users.model.js";

export const getUserInfo = async (req, res) => {
    try {
        const user = await retrieveUserInfoByEmail(req.email);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const generateCustomLolProfile = async (req, res) => {
    const stats = {
        ...req.body
    };
    await createLolProfile(stats);
    res.status(201).json(stats);
}


export const getCustomLolProfile = async (req, res) => {
    try {
        // const customLolProfile = await retrieveCustomProfileByEmail(req.email);
        res.json(customLolProfile);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}