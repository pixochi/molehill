import 'reflect-metadata';
import {buildSchema} from 'type-graphql';

const schema = buildSchema({
  resolvers: [
    `${__dirname}/resolvers/*/index.ts`,
  ],
});


export default schema;