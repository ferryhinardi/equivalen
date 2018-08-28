const dev = {
  API_HOST: 'https://pacific-diode-210512.appspot.com',
};

const prod = {
  API_HOST: 'https://pacific-diode-210512.appspot.com',
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
