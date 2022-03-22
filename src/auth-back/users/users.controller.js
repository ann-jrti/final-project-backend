import { retrieveUserInfoByEmail, createLolProfile, retrieveCustomLolProfile, updateCustomProfileStatus, retrieveDataCustomLolProfile } from "./users.model.js";

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
        const customLolProfile = await retrieveCustomProfileByEmail(req.email);
        res.json(customLolProfile);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export const getUserInfoByEmail = async (req, res) => {
    let { email } = req.params;
    const user = await retrieveUserInfoByEmail(email);
    if (user !== undefined) res.json(user)
    else res.sendStatus(404)
}

export const modifyCustomProfileStatus = async (req, res) => {
    const { email } = req.params;
    const user = await retrieveUserInfoByEmail(email);
    console.log('user', user);
    if (user) {
        await updateCustomProfileStatus(email);
        res.sendStatus(200)

    } else {
        res.status(404).json('email user not found')
    }

}

export const getDataOfCustomLolProfile = async (req, res) => {
    const { email } = req.params;
    const user = await retrieveDataCustomLolProfile(email);
    console.log('user', user);
    if (user) {
        await updateCustomProfileStatus(email);
        res.status(200).send(user)

    } else {
        res.status(404).json('email user not found')
    }
}