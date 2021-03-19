const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
  name: String,
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    }
  ]
})

module.exports = PublisherSchema;
