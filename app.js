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
let {isValidUrl} = require('./middlewares/middlewares.js');


const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'URL Shortener Microserver',
        pageDescription: 'Page description',
        userStories: [
            'I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.',
            'If I pass an invalid URL that doesn\'t follow the valid http://www.example.com format, the JSON response will contain an error instead.',
            'When I visit that shortened URL, it will redirect me to my original link.'
        ]
    })
});

app.post('/api/shorturl/new/', isValidUrl, (req, res) => {

    let url = new Url({
        original_url: req.body.url,
        short_url_id: -1
    });
 
    url.findLastId().then((resUrl) => {
            url.short_url_id = resUrl.short_url_id + 1;

            url.save().then((doc) => {
                res.status(200).send({
                    original_url: doc.original_url,
                    short_url: generateShortUrl(
                        req.protocol, 
                        req.get('host'),
                        doc.short_url_id
                    )
                });
            }, (e) => { 
                res.status(400).send(e);
            });

    }).catch((e) => {
            url.short_url_id = 1;

            url.save().then((doc) => {
                res.status(200).send({
                    original_url: doc.original_url,
                    short_url: generateShortUrl(
                            req.protocol, 
                            req.get('host'),
                            doc.short_url_id
                        )
                });
            }, (e) => { 
                res.status(400).send({
                    success: false,
                    message: 'Unable to shorten your URL'
                });
            });
    });
});

app.get('api/shorturl/:id', (req, res) => {
    // checks if id is number
    // fetch by ud
    // redirect to original url
    let url_id = req.params.id;
    res.status(200).send({url_id});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
