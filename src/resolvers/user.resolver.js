const User = require('../models/user');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const simpleCrypto = require('../services/encryptDecrypt');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = {
  users: () => User.find(),

  user: (_, { _id }) => User.findById(_id),

  createUser: async (root, args, context, info) => {
    const user = await User.findOne({ email: args.email })

    if (user && user.email === args.email) {
      throw new AuthenticationError('User Already Exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(args.password, salt)

    args.password = hash
    args.token = jwt.sign(
      {
        user: simpleCrypto.encrypt({
          email: args.email,
          name: args.name
        })
      },
      config.secret,
      {
        expiresIn: 60000 
      }
    )

    const regUser = new User(args)

    try {
      await regUser.save()
      return regUser
    } catch (ex) {
      throw new ApolloError(`User entry failure ${ex.message}`)
    }
  },

  login: async (root, args, context, info) => {
    const user = await User.findOne({ email: args.email })

    if (user && user.passwordResetCode === args.password) {
      return user
    }

    const isMatch = await bcrypt.compare(args.password, user.password)
    if (isMatch) {
      await User.updateOne({ email: args.email }, { passwordResetCode: null });
      return user;
    } else {
      throw new AuthenticationError('Wrong Password!');
    }
  },

  sendVerificationCode: async (root, args, context, info) => {
    const userEmail = simpleCrypto.decrypt(args.email);
    const user = await User.findOne({ email: userEmail });
    if (!user) return;

    let options = {
      auth: {
        api_user: 'danishto@gmail.com',
        api_key: 'Dng@36363677'
      }
    }

    let resetCode = args.email.toUpperCase().slice(0, 8)
    const res = await User.updateOne(
      { email: userEmail },
      { passwordResetCode: resetCode }
    )

    let client = nodemailer.createTransport(sgTransport(options));

    let emailObj = {
      from: 'danishto@gmail.com',
      to: 'nijapost@gmail.com',
      subject: 'Password Reset',
      text: 'Password Reset',
      html: `Please use reset code ${resetCode} as password to sign in.`
    }

    client.sendMail(emailObj, function (err, info) {
      if (err) {
        throw new AuthenticationError(err)
      } else {
        return user
      }
    })
  },

  verifyUser: async (root, args, context, info) => {
    const user = await User.findOne({
      email: args.email,
      passwordResetCode: args.code
    })

    if (user) {
      return user
    } else {
      throw new AuthenticationError('User could not be verified!')
    }
  },

  updatePassword: async (root, args, context, info) => {
    const user = await User.findOne({ email: args.email })

    if (user) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(args.password, salt)
      await User.updateOne(
        { email: args.email },
        { password: hash, passwordResetCode: null }
      )
      return user
    } else {
      throw new AuthenticationError('Password reset error!')
    }
  }
}
