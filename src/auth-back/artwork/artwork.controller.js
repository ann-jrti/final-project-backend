import { retrieveArtworkByFileName, retrieveArtworksByUserToken } from "./artwork.model.js";


export const getArtworkByFileNameCtrl = async (req, res) => {
    let { filename } = req.params
    const artwork = await retrieveArtworkByFileName(filename)
    if (artwork !== null) res.json(artwork)
    else res.sendStatus(404)
}

export const getUserArtworksCtrl = async (req, res) => {
    log.info('req ctrl', req);
    const { token } = req.query;
    log.info('token', token);
    const artwork = await retrieveArtworksByUserToken(token);
    if (artwork !== undefined) res.json(artwork);
    else res.sendStatus(404)
}