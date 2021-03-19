const Book = require("../models/book");

module.exports = {
  books: () => Book.find(),

  book: (_, { _id }) => Book.findById(_id),

  getAuthorsByBook: (author, {}) =>
    Menu.find({ author: author._id }).where({ type: "Author" }),

  getGenresByBook: (genre, {}) =>
    Book.find({ genre: genre._id }).where({ type: "Genre" }),

  createBook: async (root, args, context, info) => {
    const book = new Book(args);
    await book.save();
    return book;
  },

  updateBook: async (parent, args, context) => {
    const result = await Book.updateOne({ _id: args._id }, args);
    return result.n;
  },

  deleteBook: async (parent, args, context) => {
    const result = await Book.deleteOne({ _id: args._id }, args);
    return result.n;
  },
};
