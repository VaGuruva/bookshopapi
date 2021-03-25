const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    books: [Book]
    book(_id: ID!): Book
    publishers: [Publisher]
    publisher(_id: ID!): Publisher
    authors: [Author]
    author(_id: ID!): Author
    orders: [Order]
    order(refNumber: String): Order
    orderByUser(email: String): [Order]
  }

  type Book {
    _id: ID!
    title: String!
    isbn: String!
    publisher: Publisher
    price: String
    authors: [Author]
  }

  type Publisher {
    id: ID!,
    name: String!,
    books: [Book]
  }

  type Author {
    _id: ID!
    name: String!
    surname: String!
    books: [Book]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    token: String
    passwordResetCode: String
  }

  type Order {
    _id: ID!
    number: String
    quantity: String
    book: Book
    total: String
    user: User
  }

  type DeleteResult{
    deletedCount: Int
  }

  type Mutation {
    createUser( name: String!, email: String!, password: String!): User
    login(email: String, password: String): User
    sendVerificationCode(email: String!): User
    verifyUser(email: String!, code: String!): User
    updatePassword(email: String!, password: String!): User

    createBook(title: String, isbn: String, publisher: ID, price: String, authors: [ID]): Book
    updateBook(title: String, isbn: String, publisher: ID, price: String, authors: [ID]): Book
    deleteBook(_id: ID!): DeleteResult

    createPublisher(name: String, books: [ID]): Publisher
    updatePublisher(name: String, books: [ID]): Publisher
    deletePublisher(_id: ID!): DeleteResult

    createAuthor(name: String!, surname: String!, books: [ID]): Author
    updateAuthor(name: String!, surname: String!, books: [ID]): Author
    deleteAuthor(_id: ID!): DeleteResult

    createOrder(quantity: String, book: String, total: String, user: String): Order
    updateOrder(quantity: String, book: ID, total: String, user: ID): Int
    deleteOrder( number: String): DeleteResult
  }
`;

module.exports = typeDefs;
