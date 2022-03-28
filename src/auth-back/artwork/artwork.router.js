import express from "express";
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'
import { createUserArtwork } from "./artwork.model.js";
import { getArtworkByFileNameCtrl, getUserArtworksCtrl, deleteArtworkByIdCtrl } from "./artwork.controller.js";

const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png|jpeg|svg/;

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
        log.info('req file');
        log.info(req);
        log.info(req.file);
        const email = req.body.email;
        const id = req.body.id;
        const test = {
            ...req.file,
            email: email,
            id: id
        }
        res.json(test).status(200);
        await createUserArtwork(test);
    });


router.route('/:artworkFile')
    .get(getArtworkByFileNameCtrl)


router.route('/:id')
    .delete(deleteArtworkByIdCtrl)

router.route('/')
    .get(getUserArtworksCtrl)

export default router; 