const Author = require("../models/author");

module.exports = {
  authors: () => {
    try {
      return Author.find();
    } catch (ex) {
      throw new ApolloError(`Fetch All Authors error ${ex.message}`);
    }
  },
  
  author: (_, { _id }) => {
    try {
      return Author.findById(_id);
    } catch (ex) {
      throw new ApolloError(`Fetch Author error ${ex.message}`);
    }
  },

  getBooksByAuthor: (book, {}) => {
    try {
      return Author.find({'_id': { $in: book.authors }});
    } catch (ex) {
      throw new ApolloError(`Fetch Books By Author error ${ex.message}`);
    }  
  },

  createAuthor: async (root, args, context, info) => {
    try {
      const author = new Author(args)
      await author.save()
      return author
    } catch (ex) {
      throw new ApolloError(`Create Author error ${ex.message}`);
    } 
  },

  updateAuthor: async (parent, args, context) => {
    const existingAuthor = await Author.findOne({ name: args.name });
    if (existingAuthor && existingAuthor.name == args.name) {
      for (let newBook of args.books) {
        const bookExists = existingAuthor.books.find(
          existingbook => existingbook == newBook
        )
        if (!bookExists) {
          existingAuthor.books.push(newBook);
        }
      }
      args.books = existingAuthor.books;

      try {
        const result = await Author.updateOne({ name: args.name }, args);
        return existingAuthor;
      } catch (ex) {
        throw new ApolloError(`Author update error ${ex.message}`);
      }
    } else {
      throw new ApolloError(
        'Author does not exist, please use createAuthor mutation',
        '501'
      )
    }
  },

  deleteAuthor: async (parent, args, context) => {
    try {
      const result = await Author.deleteOne({ _id: args._id }, args);
      return result;
    } catch (ex) {
      throw new ApolloError(`Author delete error ${ex.message}`);
    }
  }
};
