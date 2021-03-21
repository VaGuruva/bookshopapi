const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  isbn: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 255
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher'
  },
  price: {
    type: Number,
    minLength: 5,
    maxLength: 255
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

module.exports = BookSchema
