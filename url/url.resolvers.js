const Url = require('../models/url');

const getUrls = async () => {
    return await Url.getUrls()
}

const addUrl = async (_,args) => {
        const fullUrl = args.full;
        const url = await Url.addUrl(fullUrl);
        return url;
}

module.exports = { getUrls, addUrl }