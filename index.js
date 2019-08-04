import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { 
  typeDef as Book, 
  resolvers as bookResolvers,
} from './src/book.js';

const Query = `
  type Query {
    _empty: String
  }
`;
const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [ Query, Book ],
  resolvers: merge(bookResolvers),
});


const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Servidor a la escucha por: ${url}`);
});