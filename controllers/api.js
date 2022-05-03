const Book = require('../models/Book.js');
const {BadRequestError, NotFoundError} = require('../errors');

//response will be array of book objects
//json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  const bookList = books.map(book => ({
    _id: book._id,
    title: book.title,
    commentcount: book.comments.length
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

const deleteAllBooks = async function(req, res){
  const delResponse = await Book.deleteMany({});
  if (!delResponse.deletedCount) {
    throw new NotFoundError("no book exists");
  }
  res.status(200).send("complete delete successful");
  //if successful response will be 'complete delete successful'
};

const getBook = async function (req, res){
  let bookid = req.params.id;
  const book = await Book.findById(bookid);
  if (!book) throw new NotFoundError("no book exists");
  res.status(200).json(book);
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
};

const addCommentOnBook = async function(req, res){
  let bookid = req.params.id;
  let comment = req.body.comment;
  if (!comment) throw new BadRequestError("missing required field comment");

  const book = await Book.findById(bookid);
  if (!book) throw new NotFoundError("no book exists");
  
  const updatedBook = await Book.findByIdAndUpdate(
    bookid,
    { $push: { comments: comment } }, 
    { new: true, runValidators: true }
  );
  
  res.status(200).json(updatedBook);
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