const Book = require('../models/Book.js');
const {BadRequestError, NotFoundError} = require('../errors');

//response will be array of book objects
//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  const bookList = books.map(book => ({
    _id: book._id,
    title: book.title,
    commentcount: books.length
  }));
  res.status(200).json(bookList);
};

//response will contain new book object including atleast _id and title
const addBook = async function (req, res){
  let title = req.body.title;
  if (!title) {
    throw new BadRequestError("missing required field title");
  }
  const book = await Book.create({title});
  res.status(201).json(book);
};

const deleteAllBooks = function(req, res){
    res.send("delete all books");
  //if successful response will be 'complete delete successful'
};

const getBook = function (req, res){
  let bookid = req.params.id;
  res.send("get book " + bookid);
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
};

const addCommentOnBook = function(req, res){
  let bookid = req.params.id;
  let comment = req.body.comment;
  res.send("add comment to" + bookid + " comment: " + comment);
  //json res format same as .get
};

const deleteBook = function(req, res){
  let bookid = req.params.id;
  res.send("delete book " + bookid);
  //if successful response will be 'delete successful'
};

module.exports = {
  getAllBooks,
  addBook,
  deleteAllBooks,
  getBook,
  addCommentOnBook,
  deleteBook
};