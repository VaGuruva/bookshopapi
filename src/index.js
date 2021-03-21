const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())
const _port = process.env.PORT || 3000;
const helmet = require("helmet");
const home = require("./routes/home");

const morgan = require("morgan");
const debug = require("debug")("app:startup");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./types/typeDefs");
const resolvers = require("./resolvers/resolvers");
const mongoose = require("mongoose");
const { getPayload } = require("./utils");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getPayload(token);
    return { user };
  },
});

app.use(helmet());
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "src/views");

app.use("/", home);
app.use('/books',express.static(__dirname + '/images/books'));

try {
  mongoose.connect(
    "mongodb+srv://booksApiadmin:iF11BebhbUfj004u@cluster0-nvxln.mongodb.net/book_order_db?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
} catch (err) {
  console.log(err);
}

server.applyMiddleware({ app });

if (app.get("env") === "development") {
  console.log(__dirname);
  app.use(morgan("tiny"));
  debug("Moninoring API requests");
}

const http = app.listen(_port, () => {
  console.log(`Listening on port ${_port}`);
});
