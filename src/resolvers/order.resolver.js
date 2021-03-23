const { ApolloError } = require('apollo-server-express');

const Order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/user");

module.exports = {
  orders: () => {
    try {
      return Order.find();
    } catch (ex) {
      throw new ApolloError(`Fetch All Orders error ${ex.message}`);
    }
  },

  order: (_, { _id }) => {
    try {
      return Order.findById(_id);
    } catch (ex) {
      throw new ApolloError(`Fetch Order error ${ex.message}`);
    }
  },

  createOrder: async (root, args, context, info) => {
    try {
      const user = await User.findOne({ email: args.user });
      const book = await Book.findOne({ isbn: args.book });
  
      args.book = book._id
      args.user = user._id
      const order = new Order(args);
      await order.save();
      return order;
    } catch (ex) {
      throw new ApolloError(`Create Order error ${ex.message}`);
    }
  },

  updateOrder: async (parent, args, context) => {
    try {
        const result = await Order.updateOne({ _id: args._id }, args);
        return result.n;
      } catch (ex) {
        throw new ApolloError(`Update Order error ${ex.message}`);
    }
  },

  deleteOrder: async (parent, args, context) => {
    try{
      const result = await Order.deleteOne({ _id: args._id }, args);
      return result.n;
    } catch (ex){
      throw new ApolloError(`Update Delete error ${ex.message}`);
    }
  },
};
