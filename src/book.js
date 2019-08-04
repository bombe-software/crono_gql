export const typeDef = `
  extend type Query {
    books: [Book]
  }
  type Book {
    title: String
  }
`;

export const resolvers = {
  Query: {
    books: () => [{ title: 'Cronicas marcianas' }]  
  }
};