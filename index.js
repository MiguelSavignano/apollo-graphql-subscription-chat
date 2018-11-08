const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require('./schema');

const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const BOOK_ADDED = 'BOOK_ADDED';
const resolvers = {
  Subscription: {
    bookAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook(root, args, context) {
      pubsub.publish(BOOK_ADDED, { bookAdded: 'success' });
      return books[0]
    },
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
