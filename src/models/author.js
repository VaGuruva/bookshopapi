const mongoose = require('mongoose');
const AuthorSchema = require('../schemas/AuthorSchema');

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;