const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.LOCAL_DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;

module.exports = db;