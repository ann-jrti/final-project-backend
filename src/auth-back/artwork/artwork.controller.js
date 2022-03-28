import { retrieveArtworkByFileName, retrieveArtworksByUserEmail, retrieveArtworkById, deleteArtwork } from "./artwork.model.js";


export const getArtworkByFileNameCtrl = async (req, res) => {
    let { filename } = req.params
    log.info(filename);
    const artwork = await retrieveArtworkByFileName(filename)
    if (artwork !== null) res.json(artwork)
    else res.sendStatus(404)
}

export const getUserArtworksCtrl = async (req, res) => {
    const { email } = req;

    log.info('email', email);
    const artwork = await retrieveArtworksByUserEmail(email);
    if (artwork !== undefined) res.json(artwork);
    else res.sendStatus(404)
}

export const deleteArtworkByIdCtrl = async (req, res) => {
    log.info(req, 'req')
    const { id } = req.params;
    const artwork = await retrieveArtworkById(id)
    if (artwork !== undefined) {
        await deleteArtwork(artwork);
        res.sendStatus(201);
    } else {
        res.status(400).send('this artwork doesnt exist');
    }

}