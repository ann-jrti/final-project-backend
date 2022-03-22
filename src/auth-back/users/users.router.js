import express from "express";
import { getUserInfo, generateCustomLolProfile, getCustomLolProfile, getUserInfoByEmail, modifyCustomProfileStatus, getDataOfCustomLolProfile } from "./users.controller.js";

const router = express.Router();

router.route('/')
    .get(getUserInfo)

router.route('/:email')
    .get(getUserInfoByEmail)

router.route('/custom-profile')
    .post(generateCustomLolProfile)
    .get(getCustomLolProfile)


router.route('/custom-profile/:email')
    .patch(modifyCustomProfileStatus)
    .get(getDataOfCustomLolProfile)


export default router;