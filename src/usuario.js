import mongoose from 'mongoose';

export const Usuario = mongoose.model('usuario', mongoose.Schema({
  nombre: String,
  contrasena: String,
  grupos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'grupo'
  }]
}));

export const typeDef = `
  extend type Query {
    usuarios: [Usuario]
  }
  
  type Usuario {
    id: String
    nombre: String
    contrasena: String,
    grupos: [Grupo]
  }

  extend type Mutation{
    add_usuario(
      nombre: String!,
      contrasena: String!
    ): Usuario
  }
`;

export const resolvers = {
  Query: {
    usuarios: () => Usuario.find({})  
  },
  Mutation: {
    add_usuario: async (parent, { nombre, contrasena }, context, info) => {
      const usuario = new Usuario({
        nombre, contrasena
      });
      await usuario.save();
      return usuario;
    }
  }
}