import * as TypeORM from 'typeorm';
import {Container} from 'typedi';
import * as TypeGraphQL from 'type-graphql';

// used for dependency injection of
// repositories in graphQL resolvers
TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

export const initDbConnection = (): Promise<TypeORM.Connection> => (
  TypeORM.createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432, // default PostgresQL port
    username: 'postgres', // default PostgresQL user
    password: process.env.PGPASSWORD,
    database: 'molehilldb', // You need to create this db locally
    synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    // dropSchema: true,
    // cache: true,
    entities: [`${__dirname}/entity/*.ts`],
  })
);
