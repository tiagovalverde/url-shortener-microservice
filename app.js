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
        pageTitle: 'URL Shortener Microserver',
        userStories: [
            'I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.',
            'If I pass an invalid URL that doesn\'t follow the valid http://www.example.com format, the JSON response will contain an error instead.',
            'When I visit that shortened URL, it will redirect me to my original link.'
        ]
    })
});

//route point to users file
app.use('/api', shorturl);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
