const dev = {
  API_HOST: 'http://localhost:4000',
  // API_HOST: 'https://equivalen-backend-staging.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen-cms-staging',
};

const prod = {
  // API_HOST: 'http://localhost:4000',
  API_HOST: 'https://equivalen-backend-staging.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen-cms-production',
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
