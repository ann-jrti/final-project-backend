import express from "express";
import { generateCustomLolProfile, deleteUserAccountCtrl, getCustomLolProfile, getUserInfoByEmail, getDataOfCustomLolProfile } from "./users.controller.js";

const router = express.Router();

router.route('/')
    .get(getUserInfoByEmail)
    .delete(deleteUserAccountCtrl)

router.route('/custom-profile')
    .post(generateCustomLolProfile)
    .get(getCustomLolProfile)

router.route('/custom-profile/:email')
    .get(getDataOfCustomLolProfile)


export default router;