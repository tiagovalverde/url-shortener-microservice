const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

//local files (server, todo model)
const {app} = require('./../app');
const {Url} = require('./../model/url');

const validURL = 'https://www.freecodecamp.org';
const invalidURL = 'https:/www.freecodecaorg';
const validButNonExistent = 'https://www.freecodeccccamp.org';

describe('POST /api/shorturl/new', () => {

    it('should create a new short url', (done) => {
        request(app)
        .post('/api/shorturl/new')
        .send({url: validURL})
        .expect(200)
        .expect((res) => {
            expect(res.body.original_url).toBe(validURL);
        })
        done()
    }); 

    it('should not create a short url from a invalid url', (done) => {
        request(app)
        .post('/api/shorturl/new')
        .send({url: invalidURL})
        .expect(400)
        .expect((res) => {
            expect(res.body.error).toBe('Invalid URL');
        })
        done()
    }); 

    it('should not create a short url from a non-existent url', (done) => {
        request(app)
        .post('/api/shorturl/new')
        .send({url: invalidURL})
        .expect(400)
        .expect((res) => {
            expect(res.body.error).toBe('Invalid URL');
        })
        done()
    }); 
});