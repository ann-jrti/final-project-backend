
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
    let pattern = /jpg|png|svg/;

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

export const uploadArtworkCtrl = () => {
    upload.single('uploadedFile'), (req, res) => {
        console.log('req file');
        console.log(req.file)
        res.json(req.file).status(200);
    }
}

export const uploadArtwork = (req, res) => {

}
