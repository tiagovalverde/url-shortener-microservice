const validator = require('validator');
const dns = require('dns');

let isValidUrl = (req, res, next) => {
    let url = req.body.url;
    //regex validation
    if(validator.isURL(url)) {

        let tempUrl = url.split('://')[1];
        if(tempUrl){
            url = tempUrl;
        }
        dns.lookup(url, 4, (err, address, family) =>  {
            if(err) {
                res.status(400).send({
                    error: 'Invalid URL'
                });
            }
            next();
        });
    }else {
        res.status(400).send({
            error: 'Invalid URL'
        })
    }
};

let isValidId = (req, res, next) =>  {
    let id = Number(req.params.id);
    if( (typeof id === 'number') && Number.isInteger(id)) {
        next();
    } else {
        res.status(400).send({
            error: 'Invalid short url'
        });
    }
};

module.exports = {
    isValidUrl, 
    isValidId
};