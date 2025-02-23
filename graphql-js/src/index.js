import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/schema.js';
import { userResolvers } from './controllers/userController.js';

const app = express();
const port = 3000;

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: userResolvers,
});

// Start the server
await server.start();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

// Start Express server
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});