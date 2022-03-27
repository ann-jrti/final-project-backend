import { getCustomLolProfile } from "../users/users.controller.js";
import { getAllPlayersOffers, createPlayerOffer, getAllCustomProfiles } from "./players-pool.model.js";

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

export const getPlayersOffersCtrl = async (req, res) => {

    const allPlayersOffers = await getAllPlayersOffers();
    const allCustomProfiles = await getAllCustomProfiles();

    const allPlayerData = []

    allPlayersOffers.forEach(playerOffer => {
        const newResult = Object.assign(playerOffer, allCustomProfiles.find(customProfile => customProfile.email === playerOffer.email));
        allPlayerData.push(newResult);
    })

    res.status(200).json(allPlayerData);
}
