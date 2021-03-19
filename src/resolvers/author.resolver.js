const Author = require("../models/author");

module.exports = {
  authors: () => Author.find(),
  
  author: (_, { _id }) => Author.findById(_id),

  getBooksByAuthor: (book, {}) =>
    Author.find({ book: book._id }).where({ type: "Book" }),

  createAuthor: async (root, args, context, info) => {
    const author = new Author(args);
    await author.save();
    return author;
  },

  updateAuthor: async (parent, args, context) => {
    const result = await Author.updateOne(
      { _id: args._id },
      args
    );
    return result.n;
  },

  deleteAuthor: async (parent, args, context) => {
    const result = await Author.deleteOne(
      { _id: args._id },
      args
    );
    return result.n;
  },
};
