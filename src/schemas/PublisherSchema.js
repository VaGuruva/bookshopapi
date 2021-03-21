const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
  name: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "Book",
    }
  ]
})

module.exports = PublisherSchema;
