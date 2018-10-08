const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { getBalance, createInvoice } = require('./api');

const app = express();
app.server = http.createServer(app);

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1 || whitelist.some((item) => new RegExp(item).test(origin));
    callback(null, originIsWhitelisted);
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/balance', getBalance);
app.post('/api/invoice', createInvoice);
app.get('/health', (req, res) => res.sendStatus(200));

app.use(express.static(path.join(__dirname + '/build')));;
app.get('*', (req, res) => res.sendFile(path.join(__dirname + '/build', 'index.html')));

app.server.listen(
  process.env.PORT || 3000,
  () => console.log(`Listening on http://localhost:${app.server.address().port}`)
);
