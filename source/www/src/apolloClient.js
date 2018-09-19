import ApolloClient from 'apollo-boost';
import config from './config';
import { getStore } from './utils/store';

const HOST = config.API_HOST || 'http://localhost:4000';

const onError = ({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      // handle errors differently based on its error code
      switch (err.extensions.code) {
      case 'INTERNAL_SERVER_ERROR':
        forward(err.message);
        break;
      default:
        break;
      }
    }
  }

  if (networkError) {
    alert('network error', networkError);
  }
};

const client = new ApolloClient({
  uri: HOST,
  request: async (operation) => {
    const token = await getStore('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  onError,
});

export default client;
