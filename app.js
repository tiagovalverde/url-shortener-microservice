const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

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

app.get('/new/:original_url(*)', (req, res) => {
    let original_url = req.params.original_url;
    res.status(200).send({original_url});
});

app.get('/:id', (req, res) => {
    let url_id = req.params.id;
    res.status(200).send({url_id});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
