import 'reflect-metadata';
import {buildSchema, MiddlewareFn} from 'type-graphql';

export const ErrorInterceptor: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next();
  } catch (err) {

    if (err.detail) {
      const regex = /\((.*?)\)/g;
      const matches = [];
      let match = regex.exec(err.detail);
      while (match != null) {
        matches.push(match[1]);
        match = regex.exec(err.detail);
      }

      if (matches.length) {
        throw new Error(`User with ${matches[0]} ${matches[1]} already exists.`);
      }
    }
  }
};

const schema = buildSchema({
  resolvers: [
    `${__dirname}/resolvers/*/index.ts`,
  ],
  globalMiddlewares: [ErrorInterceptor],
});


export default schema;