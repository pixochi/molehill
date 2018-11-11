import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ErrorResponse } from 'apollo-link-error';

// import {updateError} from 'app/components/global-event/actions';

// const graphQLErrorHandler = (response: ErrorResponse) => {
//     updateError.dispatch(response.response!.errors![0].message);
// };
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache,
  // onError: graphQLErrorHandler,
});

export default client;
