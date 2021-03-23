const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 1,
    maxLength: 255
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1000
  },
  token: {
    type: String
  },
  passwordResetCode: {
    type: String
  }
})

module.exports = UserSchema
