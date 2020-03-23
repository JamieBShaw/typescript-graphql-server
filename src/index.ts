import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/user/Register';

const main = async () => {
  try {
    await createConnection();
  } catch (err) {
    console.log(err);
    throw new Error('Could not connect to database');
  }

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('SERVER STATRED ON PORT http://localhost:4000/graphql');
  });
};

main();
