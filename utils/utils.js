let generateShortUrl = (protocol, host, short_url_id) => {
    
    return `${protocol}://${host}/api/shorturl/${short_url_id}`;
}

module.exports = {
    generateShortUrl
};