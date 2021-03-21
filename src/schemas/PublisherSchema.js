const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 255
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "Book",
    }
  ]
})

module.exports = PublisherSchema;
