import express from "express";
import bodyParser from 'body-parser'
import path from 'path'
import multer from 'multer'


const router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const storageEngine = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png|svg/; // reqex

    if (pattern.test(path.extname(file.originalname))) {
        callback(null, true);
    } else {
        callback('Error: not a valid file');
    }
};

const upload = multer({
    storage: storageEngine,
    fileFilter
});


router.route('/upload')
    .post(upload.single('uploadedFile'), (req, res) => {
        console.log('req file');
        console.log(req.file)
        res.json(req.file).status(200);
    });

export default router;