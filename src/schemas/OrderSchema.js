const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  quantity: {
    type: String,
    maxLength: 255
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  total: {
    type: String,
    maxLength: 255
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = OrderSchema;
