const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

//urlType
const urlType = new GraphQLObjectType({
name:'url',
description:'Represents a single url',
    fields:() => ({
        full:{type:GraphQLNonNull(GraphQLString)},
        short:{type:GraphQLNonNull(GraphQLString)},
    })
});

module.exports = { urlType }