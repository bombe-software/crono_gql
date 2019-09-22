import mongoose from 'mongoose';

export const Grupo = mongoose.model('grupo', mongoose.Schema({
  nombre: String,
  docente: String,
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'materia'
  },
  horario: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hora'
  }]
}));


export const typeDef = `
  extend type Query {
    grupos: [Grupo]
  }
  type Grupo {
    id: String
    nombre: String
    docente: String
    materia: Materia
    horario: [Hora]
  }
  extend type Mutation{
    add_grupo(
      nombre: String!,
      docente: String!,
      materia: String!
    ): Grupo
  } 
`;

export const resolvers = {
  Query: {
    grupos: () => Grupo.find({})
  },
  Mutation: {
    add_grupo: async (parent, { nombre, docente, materia }, context, info) => {
      const grupo = new Grupo({
        nombre, docente, materia
      });
      await grupo.save();
      return grupo;
    }
  }
}