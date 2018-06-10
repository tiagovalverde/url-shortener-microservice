const express = require('express');
const router = express.Router();

let {mongoose} = require('../db/mongoose');
let {Url} = require('../model/url');
let {generateShortUrl} = require('../utils/utils');
let {isValidUrl, isValidId} = require('../middlewares/middlewares.js');


router.post('/shorturl/new/', isValidUrl, (req, res) => {

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

router.get('/shorturl/:id', isValidId,  (req, res) => {
    
    Url.findOne({
        short_url_id: req.params.id
    })
    .then(doc => {
        if(!doc) {
            res.status(400).send({
                success: false,
                message: 'Short url not found!'
            });
        }
        res.redirect(doc.original_url);
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: 'Unable to obtain url!'
        });
    })
});

module.exports = router;