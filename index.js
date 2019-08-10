import { ApolloServer } from 'apollo-server';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';

import { 
  typeDef as Usuario, 
  resolvers as usuarioResolvers
} from './src/usuario';

import { 
  typeDef as Materia, 
  resolvers as materiaResolvers
} from './src/materia';

import { 
  typeDef as Hora, 
  resolvers as horaResolvers
} from './src/hora';

import { 
  typeDef as Grupo, 
  resolvers as grupoResolvers
} from './src/grupo';

import { 
  typeDef as Escuela, 
  resolvers as escuelaResolvers
} from './src/escuela';

import { 
  typeDef as Carrera, 
  resolvers as carreraResolvers
} from './src/carrera';

mongoose.connect('mongodb://localhost:27017/crono', {useNewUrlParser: true})
        .catch(err => console.error(err));

const Base = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const emptyResolver  = {
  Query: {
    _empty: () => "Conectado a gql" 
  }
}

const schema = makeExecutableSchema({
  typeDefs: [ Base, Usuario, Materia, Escuela, Grupo, Hora, Carrera ],
  resolvers: merge(emptyResolver, usuarioResolvers, carreraResolvers, escuelaResolvers, grupoResolvers, horaResolvers, materiaResolvers)
});
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Servidor a la escucha por: ${url}`);
});