var mongoose = require('mongoose');

let urlModel = mongoose.model('Url', {
    original_url: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    short_url_id: {
        type: Number,
        default: 0,
        required: true,
        minLength: 1
    }
});



module.exports = {urlModel};
