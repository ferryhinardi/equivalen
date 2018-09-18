import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { overrideApolloCache } from './apolloPersist';
import config from '../config';
import { getStore } from '../utils/store';

const HOST = config.API_HOST || 'http://localhost:4000';

const createApolloClient = async () => {
  const cache = new InMemoryCache();
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
    cache,
  });

  await overrideApolloCache(cache);

  return client;
};

export default createApolloClient;
