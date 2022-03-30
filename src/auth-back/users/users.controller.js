import { retrieveUserInfoByEmail, createLolProfile, retrieveCustomLolProfile, updateCustomProfileStatus, retrieveDataCustomLolProfile } from "./users.model.js";

export const generateCustomLolProfile = async (req, res) => {
    const stats = {
        ...req.body
    };
    const { email } = req;

    await createLolProfile(stats, email);
    await updateCustomProfileStatus(req.email);
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
    let { email } = req;
    const user = await retrieveUserInfoByEmail(email);
    if (user !== undefined) res.json(user)
    else res.sendStatus(404)
}

export const getDataOfCustomLolProfile = async (req, res) => {
    const { email } = req.params;
    const user = await retrieveDataCustomLolProfile(email);
    log.info('user', user);
    if (user) {
        await updateCustomProfileStatus(email);
        res.status(200).send(user)

    } else {
        res.status(404).json('email user not found')
    }
}