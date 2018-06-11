require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');

// local imports
let {mongoose} = require('./db/mongoose');
let {Url} = require('./model/url');
let {generateShortUrl} = require('./utils/utils');
let {isValidUrl, isValidId} = require('./middlewares/middlewares.js');


const port = process.env.PORT;
const app = express();

const shorturl = require('./routes/shorturl');


app.use(bodyParser.json());
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'API Project: URL Shortener Microservice'
    })
});

//route point to users file
app.use('/api', shorturl);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
