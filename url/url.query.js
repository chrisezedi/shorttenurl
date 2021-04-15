const { GraphQLList } = require('graphql');
const { UrlType } = require('./url.types');
const Url = require('../models/url');

const urlQuery = {
    type:new GraphQLList(UrlType),
    description:'Represents a List of Urls',
    resolve:async() => await Url.getUrls()
}

module.exports = { urlQuery }