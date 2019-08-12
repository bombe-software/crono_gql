import mongoose from 'mongoose';

//Agregar populate

export const Materia = mongoose.model('materia', mongoose.Schema({
    nombre: String,
    carrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carrera'
    },
    periodo: Number
}));

export const typeDef = `
  extend type Query {
    materias: [Materia]
  }
  type Materia {
    id: String
    nombre: String
    carrera: Carrera 
    periodo: Int
  }
  extend type Mutation{
    add_materia(
      nombre: String!,
      carrera: String!, 
      periodo: Int!
    ): Materia
  } 
`;

export const resolvers = {
  Query: {
    materias: () => Materia.find({})  
  },
  Mutation: {
    add_materia: async (parent, { nombre, carrera, periodo }, context, info) => {
      const materia = new Materia({
        nombre, carrera, periodo
      });
      await materia.save();
      return materia;
    }
  }
}