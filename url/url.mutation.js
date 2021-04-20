const { GraphQLNonNull,GraphQLString } = require('graphql');
const { urlType } = require('./url.types');
const { addUrl } = require('./url.resolvers');

const shortenUrl = {
    type:urlType,
    description:'Shorten Url',
    args:{
        full:{type:GraphQLNonNull(GraphQLString)}
    },
    resolve:addUrl
}

module.exports = { shortenUrl }