const { GraphQLNonNull,GraphQLString } = require('graphql');
const { UrlType } = require('./url.types');
const Url = require('../models/url');

const shortenUrl = {
    type:UrlType,
    description:'Shorten Url',
    args:{
        full:{type:GraphQLNonNull(GraphQLString)}
    },
    resolve:async (parent,args) => {
        const fullUrl = args.full;
        const url = await Url.addUrl(fullUrl);
        return url;
    }
}

module.exports = { shortenUrl }