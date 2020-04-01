import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { redis } from './redis';

const main = async () => {
    try {
        await createConnection();
    } catch (err) {
        console.log(err);
        throw new Error('Could not connect to database');
    }

    const schema = await buildSchema({
        resolvers: [__dirname + '/modules/**/*.ts'],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res }),
    });

    const app = express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000', // expect front end client to be running here
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: 'qid',
            secret: 'dferdhgrejert',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
            },
        })
    );

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log('SERVER STATRED ON PORT http://localhost:4000/graphql');
    });
};

main();
