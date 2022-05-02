const getAllBooks = function (req, res){
  //response will be array of book objects
  //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
};

const addBook = function (req, res){
  let title = req.body.title;
  //response will contain new book object including atleast _id and title
};

const deleteAllBooks = function(req, res){
  //if successful response will be 'complete delete successful'
};

const getBook = function (req, res){
  let bookid = req.params.id;
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
};

const addCommentOnBook = function(req, res){
  let bookid = req.params.id;
  let comment = req.body.comment;
  //json res format same as .get
};

const deleteBook = function(req, res){
  let bookid = req.params.id;
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