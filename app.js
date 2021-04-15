//required packages
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { urlQuery } = require("./url/url.query");
const { shortenUrl } = require("./url/url.mutation");

const express = require('express');
const app = express();                   
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
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

//connect to db
mongoose.connect(process.env.LOCAL_DB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to database")
    });

//middlewares    
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.use(router);

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});
