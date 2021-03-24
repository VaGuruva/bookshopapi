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
      if(!user){
        throw new ApolloError(`User is not defined error ${ex.message}`);
      }

      const book = await Book.findOne({ isbn: args.book });
      if(!book){
        throw new ApolloError(`Book is not defined error ${ex.message}`);
      }
  
      args.book = book._id
      args.user = user._id
      args.number = Math.random().toString(20).substr(2, 6);
    
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
      const result = await Order.deleteOne({ number: args.number }, args);
      return result;
    } catch (ex){
      throw new ApolloError(`Delete Order error ${ex.message}`);
    }
  },

  ordersByUser: async (parent, args, context) => {
    try{
      const user = await User.findOne({ email: args.email });
      if(!user){
        throw new ApolloError(`User is not defined error ${ex.message}`);
      }

      const orders = await Order.find({ user: user._id });
      return orders;
    } catch (ex){
      throw new ApolloError(`Order by User error ${ex.message}`);
    }
  }
};
