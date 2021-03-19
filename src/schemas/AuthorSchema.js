const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
  name: String,
  surname: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ]
})

module.exports = AuthorSchema
