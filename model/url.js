var mongoose = require('mongoose');

var UrlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
    },
    short_url_id: {
        type: Number,
        required: true,
        minLength: 1
    }
});


UrlSchema.methods.findLastId = function () {
    var url = this;
    return Url.findOne().sort('-short_url_id');
};

let Url = mongoose.model('Url',UrlSchema);

module.exports = {Url}; 
