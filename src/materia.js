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
`;

export const resolvers = {
  Query: {
    materias: () => Materia.find({})  
  }
}