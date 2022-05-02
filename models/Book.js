const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title of book'],
    maxlength: 50
  },
  comments: [String]
});

module.exports = mongoose.model('Book', BookSchema);