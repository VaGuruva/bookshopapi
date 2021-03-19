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
    refNumber: String!
    quantity: String!
    books: [Book]
    total: String
  }

  type Mutation {
    createUser( name: String!, email: String!, password: String!): User
    login(email: String, password: String): User
    sendVerificationCode(email: String!): User
    verifyUser(email: String!, code: String!): User
    updatePassword(email: String!, password: String!): User

    createBook(title: String, isbn: String, publisher: ID, price: String, authors: [ID]): Book
    updateBook(title: String, isbn: String, publisher: ID, price: String, authors: [ID]): Book
    deleteBook(_id: ID!): Int

    createPublisher(name: String, books: [ID]): Publisher
    updatePublisher(name: String, books: [ID]): Publisher
    deletePublisher(_id: ID!): Int

    createAuthor(name: String, surname: String, books: [ID]): Author
    updateAuthor(name: String, surname: String, books: [ID]): Author
    deleteAuthor(_id: ID!): Int

    createOrder(refNumber: String, quantity: String, books: [ID], total: String): Order
    updateOrder(refNumber: String, quantity: String, books: [ID], total: String): Order
    deleteOrder(_id: ID!): Int
  }
`;

