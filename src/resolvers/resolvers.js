const BookResolver = require('./book.resolver');
const AuthorResolver = require('./author.resolver');
const PublisherResolver = require('./publisher.resolver');
const UserResolver = require('./user.resolver');
const OrderResolver = require('./order.resolver');

const resolvers = {
  Book: {
    publisher: PublisherResolver.getBookByPublisher,
    authors: AuthorResolver.getBooksByAuthor
  },

  Author: {
    books: BookResolver.getAuthorsByBook
  },

  Query: {
    users: UserResolver.users,
    user: UserResolver.user,
    books: BookResolver.books,
    book: BookResolver.book,
    publishers: PublisherResolver.publishers,
    publisher: PublisherResolver.publisher,
    authors: AuthorResolver.authors,
    author: AuthorResolver.author,
    orders: OrderResolver.orders,
    order: OrderResolver.order
  },

  Mutation: {
    createUser: UserResolver.createUser,
    login: UserResolver.login,
    sendVerificationCode: UserResolver.sendVerificationCode,
    verifyUser: UserResolver.verifyUser,
    updatePassword: UserResolver.updatePassword,
    createBook: BookResolver.createBook,
    updateBook: BookResolver.updateBook,
    deleteBook: BookResolver.deleteBook,
    createAuthor: AuthorResolver.createAuthor,
    updateAuthor: AuthorResolver.updateAuthor,
    deleteAuthor: AuthorResolver.deleteAuthor,
    createPublisher: PublisherResolver.createPublisher,
    updatePublisher: PublisherResolver.updatePublisher,
    deletePublisher: PublisherResolver.deletePublisher,
    createOrder: OrderResolver.createOrder,
    updateOrder: OrderResolver.updateOrder,
    deleteOrder: OrderResolver.deleteOrder
  }
}

module.exports = resolvers;