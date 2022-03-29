import { getCustomLolProfile } from "../users/users.controller.js";
import { getAllPlayersOffers, createPlayerOffer, getAllCustomProfiles, getPlayerOfferByPlayerEmail } from "./players-pool.model.js";

export const createPlayerOfferCtrl = async (req, res) => {
    const { role, playerDescription, lookingFor } = req.body;

    const playerOffer = {
        role,
        playerDescription,
        lookingFor,
        email: req.email
    };
    await createPlayerOffer(playerOffer, req.email);
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


export const getPlayerOfferCtrl = async (req, res) => {
    const { email } = req
    log.info('email ctrl', email)
    const playerOffer = await getPlayerOfferByPlayerEmail(email);
    log.info('playeroffer ctrl', playerOffer)
    if (playerOffer !== undefined) {
        res.sendStatus(200);
    } else {
        res.status(400).send('this player offer doesnt exist');
    }

}