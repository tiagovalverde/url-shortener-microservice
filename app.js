const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Here goes static page');
});

app.post('/new/:original_url', (req, res) => {
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
