const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  refNumber: {
    type: String,
    minLength: 5,
    maxLength: 50
  },
  quantity: {
    type: String,
    minLength: 5,
    maxLength: 255
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    }
  ],
  total: {
    type: Number,
    minLength: 5,
    maxLength: 255
  }
});
