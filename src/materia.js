import mongoose from 'mongoose';

//Agregar populate


const Materia = mongoose.model('materia', mongoose.Schema({
    nombre: String,
    carrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carrera'
    },
    escuela: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'escuela'
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
    escuela: Escuela
    semestre: Int
  }
  extend type Mutation{
    add_materia(
      nombre: String!,
      carrera: Carrera!, 
      escuela: Escuela!,
      semestre: Int!
    ): Materia
  } 
`;

export const resolvers = {
  Query: {
    materias: () => Materia.find({})  
  },
  Mutation: {
    add_materia: async (parent, { nombre, carrera, escuela, semestre }, context, info) => {
      const materia = new Materia({
        nombre, carrera, escuela, semestre
      });
      await materia.save();
      return materia;
    }
  }
}