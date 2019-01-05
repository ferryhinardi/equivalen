import ApolloClient from 'apollo-boost';
import { ApolloLink } from 'apollo-client-preset';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NotificationManager } from 'react-notifications';
import { overrideApolloCache } from './apolloPersist';
import config from '../config';
import { main } from '../store/index';
import { getStore } from '../utils/store';

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
    NotificationManager.error('Network Error', networkError);
  }
};

const createApolloClient = async () => {
  const cache = new InMemoryCache();
  const { mainInititalState, ...props } = main;
  const clientState = {
    cache,
    defaults: {
      main: mainInititalState,
    },
    resolvers: {
      Mutation: {
        ...props,
      },
    },
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
    clientState,
    onError,
    cache,
  });

  await overrideApolloCache(cache);

  return client;
};

export default createApolloClient;
