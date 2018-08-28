import ApolloClient from 'apollo-boost';
import config from './config';

const HOST = config.API_HOST || 'http://localhost:4000';

const client = new ApolloClient({
  uri: HOST,
});

export default client;
