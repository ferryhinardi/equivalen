const dev = {
  API_HOST: 'https://equivalen-backend-staging.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen-cms-staging',
  ACCOUNT_KIT: {
    APPID: '269466223664135',
    CSRF: 'b4HBW0rzQUqa+bnYNMJEpA==',
    VERSION: 'v1.1',
  },
};

const prod = {
  API_HOST: 'https://equivalen-backend-production.herokuapp.com',
  GOOGLE_CLOUD_STORAGE_API_URI: 'https://storage.googleapis.com/equivalen-cms-production',
  ACCOUNT_KIT: {
    APPID: '2281886948759780',
    CSRF: 'b4HBW0rzqUQa+BnyNmJepA==',
    VERSION: 'v1.1',
  },
};

const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
