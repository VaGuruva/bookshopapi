const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 255
  },
  surname: {
    type: String,
    required: true,
    maxLength: 255
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ]
})

module.exports = AuthorSchema
