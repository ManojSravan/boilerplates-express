import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/schema';
import { userResolvers } from './controllers/UserController';
import { ResolverContext } from './controllers/UserController';

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json());

  const server = new ApolloServer<ResolverContext>({
    typeDefs,
    resolvers: userResolvers,
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});