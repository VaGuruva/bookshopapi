const Book = require('../models/book');
const { ApolloError } = require('apollo-server-express');

module.exports = {
  books: () => {
    try {
      return Book.find();
    } catch (ex) {
      throw new ApolloError(`Fetch All Books error ${ex.message}`);
    }
  },

  book: (_, { _id }) => {
    try {
      return Book.findById(_id);
    } catch (ex) {
      throw new ApolloError(`Fetch Book error ${ex.message}`);
    }
  },

  getAuthorsByBook: (author, {}) => {
    try {
      return Book.find({'_id': { $in: author.books }});
    } catch (ex) {
      throw new ApolloError(`Fetch Books By Author error ${ex.message}`);
    }  
  },

  createBook: async (root, args, context, info) => {
    try {
      const book = new Book(args)
      await book.save()
      return book
    } catch (ex) {
      throw new ApolloError(`Create Book error ${ex.message}`);
    } 
  },

  updateBook: async (parent, args, context) => {
    const existingBook = await Book.findOne({ isbn: args.isbn });
    if (existingBook && existingBook.isbn == args.isbn) {

      for (let newAuthor of args.authors) {
        const authorExists = existingBook.authors.find(
          existingAuthor => existingAuthor == newAuthor
        )
        if (!authorExists) {
          existingBook.authors.push(newAuthor);
        }
      }
      args.authors = existingBook.authors;

      try {
        const result = await Book.updateOne({ isbn: args.isbn }, args);
        return existingBook;
      } catch (ex) {
        throw new ApolloError(`Book update error ${ex.message}`);
      }
    } else {
      throw new ApolloError(
        'Book does not exist, please use createBook mutation',
        '501'
      )
    }
  },

  deleteBook: async (parent, args, context) => {
    try {
      const result = await Book.deleteOne({ _id: args._id }, args);
      return result.n;
    } catch (ex) {
      throw new ApolloError(`Book delete error ${ex.message}`);
    }
  },

  getOrderByBook: (order, {}) => {
    try {
      return Book.findById(order.book)
    } catch (ex) {
      throw new ApolloError(`Fetch Order by Book error ${ex.message}`);
    }
  }
}
