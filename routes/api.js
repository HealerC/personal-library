/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const {
  getAllBooks,
  addBook,
  deleteAllBooks,
  getBook,
  addCommentOnBook,
  deleteBook
} = require('../controllers/api.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(getAllBooks)
    
    .post(addBook)
    
    .delete(deleteAllBooks);



  app.route('/api/books/:id')
    .get(getBook)
    
    .post(addCommentOnBook)
    
    .delete(deleteBook);
  
};
