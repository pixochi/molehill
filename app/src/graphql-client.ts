import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import {createUploadLink} from 'apollo-upload-client';

import { updateError } from './components/global-event/actions';

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
      updateError.dispatch('Something went wrong');
    }),
    createUploadLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache,
});

export default client;
