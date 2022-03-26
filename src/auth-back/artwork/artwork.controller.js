import { retrieveArtworkByFileName, retrieveArtworksByUserEmail } from "./artwork.model.js";


export const getArtworkByFileNameCtrl = async (req, res) => {
    let { filename } = req.params
    log.info(filename);
    const artwork = await retrieveArtworkByFileName(filename)
    if (artwork !== null) res.json(artwork)
    else res.sendStatus(404)
}

export const getUserArtworksCtrl = async (req, res) => {
    const { email } = req.query;
    log.info('email', email);
    const artwork = await retrieveArtworksByUserEmail(email);
    if (artwork !== undefined) res.json(artwork);
    else res.sendStatus(404)
}