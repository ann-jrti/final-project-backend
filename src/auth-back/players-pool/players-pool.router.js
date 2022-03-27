import express from "express";
import { createPlayerOfferCtrl } from "./players-pool.controller.js";

const router = express.Router();

router.route('/')
    .post(createPlayerOfferCtrl)


export default router; 