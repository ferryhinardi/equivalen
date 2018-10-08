const { request } = require('./request');
const { convertBase64, config } = require('./config');
const { getUnixTime } = require('./utils');

const Authorization = `Basic ${convertBase64(config.secretKey)}`;
request.init(config.xenditApi, {
  Authorization,
});

const amount = 1800000;

const getBalance = (req, res) => {
  return request
    .get('/balance')
    .then((data) => res.json(data))
    .catch((e) => res.status(e.status).json(e.error));
};

const createInvoice = (req, res) => {
  const externalId = getUnixTime().toString();
  const params = {
    external_id: externalId,
    amount,
    payer_email: config.emailBuyer,
    description: 'Buyer by admin',
  };

  return request
    .post('/v2/invoices', params)
    .then((data) => res.json(data))
    .catch((e) => res.status(e.status).json(e.error));
};

module.exports.getBalance = getBalance;
module.exports.createInvoice = createInvoice;
