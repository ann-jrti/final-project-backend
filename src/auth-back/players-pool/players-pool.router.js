import express from "express";
import { createPlayerOfferCtrl, getPlayersOffersCtrl, getPlayerOfferCtrl } from "./players-pool.controller.js";
import { validateAuth } from "../auth/auth.middleware.js";

const router = express.Router();

router.route('/')
    .post(validateAuth, createPlayerOfferCtrl)
    .get(getPlayersOffersCtrl)

router.route('/player-offer',)
    .get(validateAuth, getPlayerOfferCtrl)


export default router; 