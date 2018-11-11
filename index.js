const mongoose = require('mongoose');
const env = process.env.ENV || 'local';
const config = require(`./env/${env}`);

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const boom = require('boom');

const app = {
    mongoose, boom
};

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', async function() {

    console.log('Databese connected');

    app.models = await require('./models')(app);

    app.express = express();

    app.express.listen(config.express.port);

    console.log(`App started at port:${config.express.port} ENV:${env}`);

    app.express.use(bodyParser.json({ type: 'application/json'}));
    app.express.use(expressValidator());

    require('./controllers')(app);
});