const Publisher = require('../models/publisher');
const { ApolloError } = require('apollo-server-express');

module.exports = {
  publishers: () => {
    try {
      return Publisher.find();
    } catch (ex) {
      throw new ApolloError(`Fetch All Publishers error ${ex.message}`);
    }
  },

  publisher: (_, { _id }) => {
    try {
      return Publisher.findById(_id);
    } catch (ex) {
      throw new ApolloError(`Fetch Publisher error ${ex.message}`);
    }
  },

  getBookByPublisher: (book, args) =>
    Publisher.findById(book.publisher),

  createPublisher: async (root, args, context, info) => {
    try {
      const publisher = new Publisher(args);
      await publisher.save();
      return publisher
    } catch (ex) {
      throw new ApolloError(`Publisher create error ${ex.message}`);
    }
  },

  updatePublisher: async (parent, args, context) => {
    const existingPublisher = await Publisher.findOne({ name: args.name });
    if (existingPublisher && existingPublisher.name == args.name) {
      for (let newBook of args.books) {
        const bookExists = existingPublisher.books.find(
          existingbook => existingbook == newBook
        )
        if (!bookExists) {
          existingPublisher.books.push(newBook);
        }
      }
      args.books = existingPublisher.books;

      try {
        const result = await Publisher.updateOne({ name: args.name }, args);
        return existingPublisher;
      } catch (ex) {
        throw new ApolloError(`Publisher update error ${ex.message}`);
      }
    } else {
      throw new ApolloError(
        'Publisher does not exist, please use createPublisher mutation',
        '501'
      )
    }
  },

  deletePublisher: async (parent, args, context) => {
    try {
      const result = await Publisher.deleteOne({ _id: args._id }, args);
      return result.n;
    } catch (ex) {
      throw new ApolloError(`Publisher delete error ${ex.message}`);
    }
  }
}
