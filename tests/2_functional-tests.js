/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {

    let testId;
    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        const payload = { title: "The Little Prince" }
        chai
          .request(server)
          .post('/api/books')
          .send(payload)
          .end(function(err, res) {
            assert.equal(res.status, 201);
            assert.equal(res.type, 'application/json', 'The book object should be returned');
            
            assert.property(res.body, '_id', 'Book should contain an _id');
            testId = res.body._id;
            assert.property(res.body, 'title', 'Book should contain a title');
            assert.equal(res.body.title, payload.title, 'Title returned should = title sent');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        const payload = { }
        chai
          .request(server)
          .post('/api/books')
          .send(payload)
          .end(function(err, res) {
            //assert.equal(res.status, 400);
            assert.equal(res.type, 'text/html', 'An error text should be returned');
            console.log("body", res.body, "text", res.text);
            assert.equal(res.text, "missing required field title");
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get(`/api/books/${testId.slice(0, testId.length-2)}4a`)
        .end(function(err, res){
          //assert.equal(res.status, 404);
          assert.equal(res.type, 'text/html', 'An error text should be returned');
          assert.equal(res.text, "no book exists");
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get(`/api/books/${testId}`)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, 'comments', 'Book should contain comments');
          assert.property(res.body, 'title', 'Book should contain title');
          assert.property(res.body, '_id', 'Book should contain _id');
          done();
        });
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        const payload = { comment: "Just some dude going to different planets" }
        chai
          .request(server)
          .post('/api/books/' + testId)
          .send(payload)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json', 'The book object should be returned');
            assert.property(res.body, 'comments', 'Book should contain comments');
            const comments = res.body.comments;
            assert.equal(comments[comments.length-1], payload.comment);
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        const payload = { }
        chai
          .request(server)
          .post('/api/books/' + testId)
          .send(payload)
          .end(function(err, res) {
            //assert.equal(res.status, 400);
            assert.equal(res.type, 'text/html', 'An error text should be returned');
            assert.equal(res.text, "missing required field comment");
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        const payload = { comment: "love the book"}
        chai
          .request(server)
          .post(`/api/books/${testId.slice(0, testId.length-2)}4a`)
          .send(payload)
          .end(function(err, res) {
            //assert.equal(res.status, 404);
            assert.equal(res.type, 'text/html', 'An error text should be returned');
            assert.equal(res.text, "no book exists");
            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .delete('/api/books/' + testId)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "delete successful");
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
          .request(server)
          .delete(`/api/books/${testId.slice(0, testId.length-2)}4a`)
          .end(function(err, res) {
            //assert.equal(res.status, 404);
            assert.equal(res.type, 'text/html', 'An error text should be returned');
            assert.equal(res.text, "no book exists");
            done();
          });
      });

    });

  });

});
