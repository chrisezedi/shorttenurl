//required packages
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { urlQuery } = require("./url/url.query");
const { shortenUrl } = require("./url/url.mutation");

const express = require('express');
const app = express();                   
const router = require("./routes/url.routes");

//RootQueryType
const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:() => ({
        urls:urlQuery
    })
});

//RootMutationType
const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description:'Root Mutation',
    fields:() => ({
        shortenUrl
    })
});

//GraphQl shema
const schema = new GraphQLSchema({
    query:RootQueryType,
    mutation:RootMutationType
})

//middlewares    
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.use(router);

module.exports = app;
