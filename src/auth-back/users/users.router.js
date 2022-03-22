import express from "express";
import { getUserInfo, generateCustomLolProfile, getCustomLolProfile } from "./users.controller.js";

const router = express.Router();

router.route('/')
    .get(getUserInfo)

router.route('/custom-profile')
    .post(generateCustomLolProfile)
    .get(getCustomLolProfile)

export default router;