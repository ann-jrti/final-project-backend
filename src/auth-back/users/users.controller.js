import { retrieveUserInfoByEmail } from "./users.model.js";

export const getUserInfo = async (req, res) => {
    try {
        const user = await retrieveUserInfoByEmail(req.email);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
