import mongoose from 'mongoose';

const Carrera = mongoose.model('carrera', mongoose.Schema({
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
      await carrera.save();
      return carrera;
    }
  }
}