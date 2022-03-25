import { retrieveArtworkByFileName, retrieveArtworksByUserToken } from "./artwork.model.js";

// const storageEngine = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function (req, file, callback) {
//         callback(
//             null,
//             file.fieldname + '-' + Date.now() + path.extname(file.originalname)
//         );
//     },
// });

// const fileFilter = (req, file, callback) => {
//     let pattern = /jpg|png|svg/;

//     if (pattern.test(path.extname(file.originalname))) {
//         callback(null, true);
//     } else {
//         callback('Error: not a valid file');
//     }
// };

// const upload = multer({
//     storage: storageEngine,
//     fileFilter
// });

// export const uploadArtworkCtrl = () => {
//     upload.single('uploadedFile'), (req, res) => {
//         console.log('req file');
//         console.log(req.file)
//         res.json(req.file).status(200);
//     }
// }

// export const uploadArtwork = (req, res) => {

// }


export const getArtworkByFileNameCtrl = async (req, res) => {
    let { filename } = req.params
    const artwork = await retrieveArtworkByFileName(filename)
    if (artwork !== null) res.json(artwork)
    else res.sendStatus(404)
}


export const getUserArtworksCtrl = async (req, res) => {
    console.log('req ctrl', req);
    const { token } = req.query;
    console.log('token', token);
    const artwork = await retrieveArtworksByUserToken(token);
    if (artwork !== undefined) res.json(artwork);
    else res.sendStatus(404)
}