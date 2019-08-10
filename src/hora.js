import mongoose from 'mongoose';
const Hora = mongoose.model('hora', mongoose.Schema({
  salon: String,
  dia_semana: String,
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
`;
