let config = {};
const xenditApi = 'https://api.xendit.co';

const convertBase64 = (code) => Buffer.from(code).toString('base64');

if (process.env.NODE_ENV === 'development') {
  config = {
    xenditApi,
    secretKey: 'xnd_development_OYiFfL4thLX5wc44KrcaEjaZMNOi9YR9kn3l+Rxg+23V+renDw91hA==:',
    emailBuyer: 'dev@pt-gps.com',
  };
} else {
  config = {
    xenditApi,
    secretKey: 'xnd_development_OYiFfL4thLX5wc44KrcaEjaZMNOi9YR9kn3l+Rxg+23V+renDw91hA==:',
    emailBuyer: 'dev@pt-gps.com',
  };
}

module.exports.convertBase64 = convertBase64;
module.exports.config = config;
