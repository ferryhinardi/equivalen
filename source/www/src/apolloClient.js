import ApolloClient from 'apollo-boost';

const HOST = process.env.API_HOST || 'http://localhost:4000';

const client = new ApolloClient({
  uri: HOST,
});

export default client;
