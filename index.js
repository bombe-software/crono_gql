import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';

import { 
  typeDef as Usuario, 
  resolvers as usuarioResolvers
} from './src/usuario';

mongoose.connect('mongodb://localhost:27017/crono', {useNewUrlParser: true})
        .catch(err => console.error(err));

const Query = `
  type Query {
    _empty: String
  }
`;

export const testResolver = {
  Query: {
    _empty: () => "Boiler plate completo"  
  }
}

const schema = makeExecutableSchema({
  typeDefs: [ Query, Usuario ],
  resolvers: merge(testResolver,usuarioResolvers)
});
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Servidor a la escucha por: ${url}`);
});