const app = require('./app');
const PORT = process.env.PORT || 5000;
const db = require('./db/db');

//connect to db
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to database");

    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`)
    });
    });