const { GraphQLList } = require('graphql');
const { urlType } = require('./url.types');
const { getUrls } = require('./url.resolvers');

const urlQuery = {
    type:new GraphQLList(urlType),
    description:'Represents a List of Urls',
    resolve:getUrls
}

module.exports = { urlQuery }