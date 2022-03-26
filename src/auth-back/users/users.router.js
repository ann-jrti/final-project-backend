import express from "express";
import { generateCustomLolProfile, getCustomLolProfile, getUserInfoByEmail, getDataOfCustomLolProfile } from "./users.controller.js";

const router = express.Router();

router.route('/')
    .get(getUserInfoByEmail)

router.route('/custom-profile')
    .post(generateCustomLolProfile)
    .get(getCustomLolProfile)

router.route('/custom-profile/:email')

    .get(getDataOfCustomLolProfile)


export default router;