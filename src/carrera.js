import mongoose from 'mongoose';
import { Escuela } from './escuela';

export const Carrera = mongoose.model('carrera', mongoose.Schema({
  carrera: String
}));


export const typeDef = `
  extend type Query {
    carreras: [Carrera]
  }
  type Carrera {
    id: String
    nombre: String
  }
  extend type Mutation{
    add_carrera(
      nombre: String!,
      escuela: String!
    ): Carrera
  } 
`;

export const resolvers = {
  Query: {
    carreras: () => Carrera.find({})  
  },
  Mutation: {
    add_carrera: async (parent, { nombre, escuela }, context, info) => {
      const carrera = new Carrera({
        nombre, escuela
      });

      const result = await carrera.save();

      await Escuela.findByIdAndUpdate(escuela, { $push: { "carreras": result._id } }, { new: true });

      return carrera;
    }
  }
}