import mongoose from 'mongoose';

const Grupo = mongoose.model('grupo', mongoose.Schema({
  nombre: String,
  docente: String,
  horario: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'horario'
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
    horario: [Hora]
  }
  extend type Mutation{
    add_grupo(
      nombre: String!,
      docente: String!
    ): Grupo
  } 
`;

export const resolvers = {
  Query: {
    grupos: () => Grupo.find({})
  },
  Mutation: {
    add_grupo: async (parent, { nombre, docente }, context, info) => {
      const grupo = new Grupo({
        nombre, docente
      });
      await grupo.save();
      return grupo;
    }
  }
}