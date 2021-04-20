const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;

module.exports = db;