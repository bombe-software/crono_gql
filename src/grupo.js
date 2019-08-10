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
`;

export const resolvers = {
  Query: {
    grupos: () => Grupo.find({})  
  }
}