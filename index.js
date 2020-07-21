import { ApolloServer } from 'apollo-server-express';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';


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
//Conexion con Mongoose
mongoose.connect('mongodb://localhost:27017/crono', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.error(err));

//Configruacion del schema
const Base = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const emptyResolver = {
  Query: {
    _empty: () => "Conectado a gql"
  }
}

const schema = makeExecutableSchema({
  typeDefs: [Base, Usuario, Materia, Escuela, Grupo, Hora, Carrera],
  resolvers: merge(emptyResolver, usuarioResolvers, carreraResolvers, escuelaResolvers, grupoResolvers, horaResolvers, materiaResolvers)
});
const server = new ApolloServer({ schema });

//Configuracion express y auth
const app = express();
app.use(passport.initialize());
app.use(passport.session());

const GRAPHQL_PORT = 4000;
app.get('/mal', function (req, res) {
  res.send('mal');
});
app.get('/bien', function (req, res) {
  res.send('bien');
});

passport.use(new FacebookStrategy({
  clientID: 207156957296218,
  clientSecret: 'f39616eb47dcb626aaafd020efb3de25',
  callbackURL: "http://localhost:4000/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    const newUser = {
      facebookId: profile.id,
      nombre: profile.displayName
    };
    console.log(newUser);
    done(null, newUser);
  }
));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:4000/bien',
  failureRedirect: 'http://localhost:4000/mal',
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



//Poner a la escucha el servidor
server.applyMiddleware({ app, path: '/gql' });
app.listen({ port: GRAPHQL_PORT }, () => {
  console.log(`http://localhost:${GRAPHQL_PORT}${server.graphqlPath}`)
});