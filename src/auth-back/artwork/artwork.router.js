import express from "express";
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'
import { createUserArtwork } from "./artwork.model.js";

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png|svg/;

    if (pattern.test(path.extname(file.originalname))) {
        callback(null, true);
    } else {
        callback('Error: not a valid file');
    }
};

const upload = multer({
    fileFilter
});

router.route('/upload')
    .post(upload.single('uploadedFile'), async (req, res) => {
        console.log('req file');
        console.log(req.file);
        res.json(req.file).status(200);
        await createUserArtwork(req.file);
    });

export default router;