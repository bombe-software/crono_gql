import mongoose from 'mongoose';
import { Escuela } from './escuela';

export const Usuario = mongoose.model('usuario', mongoose.Schema({
  nombre: String,
  apellidoMaterno: String,
  apellidoPaterno: String,
  contrasena: String,
  correo: String,
  idFacebook: String,
  escuelas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'escuela'
  }],
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
    id: String,
    nombre: String,
    apellidoMaterno: String,
    apellidoPaterno: String,
    contrasena: String,
    correo: String,
    idFacebook: String,
    escuelas: [Escuela],
    grupos: [Grupo]
  }

  extend type Mutation{
    add_usuario(
      nombre: String,
      apellidoMaterno: String,
      apellidoPaterno: String,
      nombreUsuario:String,
      contrasena: String,
      correo: String
    ): Usuario
    add_usuarioFacebook(
      nombre: String,
      apellidoMaterno: String,
      apellidoPaterno: String,
      nombreUsuario:String, 
      idFacebook: String
    ): Usuario
    loginFacebook(
      idFacebook: String
    ): Usuario
    login(
      contrasena: String,
      correo: String
    ): Usuario
  }
`;

export const resolvers = {
  Query: {
    usuarios: () => Usuario.find({})
  },
  Mutation: {
    add_usuario: async (parent, { nombre, apellidoMaterno, apellidPaterno, nombreUsuario, contrasena, correo }, context, info) => {
      const usuario = new Usuario({ 
        nombre, apellidoMaterno, apellidPaterno, nombreUsuario, contrasena, correo 
      });
      await usuario.save();
      return usuario;
    },
    add_usuarioFacebook: async (parent, { nombre, apellidoMaterno, apellidoPaterno, nombreUsuario, idFacebook }, context, info) => {
      const usuario = new Usuario({ 
        nombre, apellidoMaterno, apellidoPaterno, nombreUsuario, idFacebook 
      });
      await usuario.save();
      return usuario;
    },
    loginFacebook: async (parent, { idFacebook }, context, info) => {
      return {id: 40};
    },
    login: async (parent, { contrasena, correo  }, context, info) => {
      return {id: 40};
    }
  }
}