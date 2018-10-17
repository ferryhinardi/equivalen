const dev = {
  API_HOST: 'http://localhost:4000',
};

const prod = {
  API_HOST: 'https://equivalen-backend.herokuapp.com',
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
