import { createPlayerOffer } from "./players-pool.model.js";

export const createPlayerOfferCtrl = async (req, res) => {
    const { role, playerDescription } = req.body;

    const playerOffer = {
        role,
        playerDescription,
        email: req.email
    };
    await createPlayerOffer(playerOffer);
    res.status(201).json(playerOffer);
}
