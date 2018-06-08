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
}

module.exports = {isValidUrl};