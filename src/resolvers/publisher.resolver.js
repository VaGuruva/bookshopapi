const Publisher = require('../models/publisher')

module.exports = {
  publishers: () => Publisher.find(),

  publisher: (_, { _id }) => Publisher.findById(_id),

  getBooksByPublisher: (book, {}) =>
  Publisher.find({ book: book._id }).where({ type: 'Book' }),

  createPublisher: async (root, args, context, info) => {
    const publisher = new Publisher(args)
    await publisher.save()
    return publisher
  },

  updatePublisher: async (parent, args, context) => {
    const result = await Publisher.updateOne({ _id: args._id }, args)
    return result.n
  },

  deletePublisher: async (parent, args, context) => {
    const result = await Publisher.deleteOne({ _id: args._id }, args)
    return result.n
  }
}
