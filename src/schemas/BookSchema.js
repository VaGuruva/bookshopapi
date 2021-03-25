const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 255
  },
  isbn: {
    type: String,
    unique: true,
    maxLength: 255
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  price: {
    type: String,
    maxLength: 255
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

module.exports = BookSchema
