import express from "express";
import { createPlayerOfferCtrl, getPlayersOffersCtrl } from "./players-pool.controller.js";

const router = express.Router();

router.route('/')
    .post(createPlayerOfferCtrl)
    .get(getPlayersOffersCtrl)


export default router; 