const validator = require('validator');

let isValidUrl = (req, res, next) => {
    let url = req.body.url;
    
    if(validator.isURL(url)) {
        next();
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