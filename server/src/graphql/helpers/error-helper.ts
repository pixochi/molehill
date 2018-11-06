import { GraphQLFormattedError } from 'graphql';

interface IGraphQLError {
  code: number;
  message: string;
  table: string;
}

export class GraphQLError implements IGraphQLError {

  code: number;
  message: string;
  table: string;

  constructor(error: GraphQLFormattedError) {
    this.code = error.code;
    this.table = error.table;

    if (error.detail) {
      const regex = /\((.*?)\)/g;
      const matches = [];
      let match = regex.exec(error.detail);
      while (match != null) {
        matches.push(match[1]);
        match = regex.exec(error.detail);
      }

      if (matches.length) {
        this.message = `User with ${matches[0]} ${matches[1]} already exists`;
      }
    }
  }
}