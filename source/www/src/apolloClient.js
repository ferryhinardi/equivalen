import ApolloClient from 'apollo-boost';
import config from './config';
import {getStore} from './utils/store';

const HOST = config.API_HOST || 'http://localhost:4000';
const client = new ApolloClient({
  uri: HOST,
  request: async (operation) => {
    const token = await getStore('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
});

export default client;
