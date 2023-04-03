import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./fakedb.js";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): [User]
    quotes: [Quote]
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    id: ID
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.id == args.id),
    quotes: () => quotes,
  },
  User: {
    quotes: (ur) => quotes.filter((qr) => qr.id === ur.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
