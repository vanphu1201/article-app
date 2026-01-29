import { expressMiddleware } from '@as-integrations/express5';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import * as database from './config/database';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs/index.typedefs';

const startServer = async () => {
    dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT;

// GraphQL
const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers,
});

await apolloServer.start();

app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(apolloServer)
);

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
});

};

startServer();