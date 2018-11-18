import express, {Express} from 'express';
import  {ApolloServer} from 'apollo-server-express';

import buildSchema from 'src/graphql/schema';

const startServer = (): Promise<{app: Express, server: ApolloServer}> => {
  const app = express();

  // Allows to serve static files
  app.use(express.static('uploads'));

  return new Promise((resolve) => {
    buildSchema.then(schema => {
      const server = new ApolloServer({schema});
      server.applyMiddleware({ app });

      resolve({app, server});
    });
  });
};

export default startServer;
