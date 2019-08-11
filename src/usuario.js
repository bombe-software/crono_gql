import mongoose from 'mongoose';

export const Usuario = mongoose.model('usuario', mongoose.Schema({
  nombre: String,
  contrasena: String,
  materias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'materia'
  }]
}));

export const typeDef = `
  extend type Query {
    usuarios: [Usuario]
  }
  type Usuario {
    nombre: String
    contrasena: String,
    materias: [Materia]
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