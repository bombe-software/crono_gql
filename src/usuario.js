import mongoose from 'mongoose';

export const typeDef = `
  extend type Query {
    usuarios: [Usuario]
  }
  type Usuario {
    nombre_usuario: String
    contrasena: String
  }
`;

const Usuario = mongoose.model('usuario', mongoose.Schema({
  nombre_usuario: String,
  contrasena: String
}));

export const resolvers = {
  Query: {
    usuarios: () => Usuario.find({})  
  }
}