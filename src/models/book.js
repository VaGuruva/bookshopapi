const mongoose = require('mongoose');
const BookSchema = require('../schemas/BookSchema');

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;