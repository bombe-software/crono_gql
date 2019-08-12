import mongoose from 'mongoose';
import { Grupo } from './grupo'
export const Hora = mongoose.model('hora', mongoose.Schema({
  salon: String,
  dia_semana: {
    type: String,
    enum: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
  },
  hora_inicio: String,
  hora_fin: String
}));

export const typeDef = `
  type Hora {
    id: String
    salon: String
    dia_semana: String
    hora_inicio: String
    hora_fin: String
  }
  extend type Mutation{
    add_hora(
      grupo: String!,
      salon: String!,
      dia_semana: String!,
      hora_inicio: String!,
      hora_fin: String!,
    ): Hora
  } 
`;

export const resolvers = {
  Mutation: {
    add_hora: async (parent, { grupo, salon, dia_semana, hora_inicio, hora_fin }, context, info) => {
      const hora = new Hora({
        salon, dia_semana, hora_inicio, hora_fin
      });
      const result = await hora.save();
      await Grupo.findByIdAndUpdate(grupo, { $push: { "horario": result._id } }, { new: true });
      return hora;
    }
  }
}