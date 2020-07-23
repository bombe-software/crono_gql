import mongoose from 'mongoose';

export const Escuela = mongoose.model('escuela', mongoose.Schema({
  nombre: String
}));

export const typeDef = `
  extend type Query {
    escuelas: [Escuela]
  }
  
  type Escuela {
    id: String
    nombre: String
  }

  extend type Mutation{
    add_escuela(
      nombre: String!
    ): Escuela
  }  
`;

export const resolvers = {
  Query: {
    escuelas: () => Escuela.find({})
  },
  Mutation: {
    add_escuela: async (parent, { nombre }, context, info) => {
      const escuela = new Escuela({
        nombre
      });
      await escuela.save();
      return escuela;
    }
  }
}