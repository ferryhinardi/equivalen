// @flow

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const whitelistNotAvailablePath = ['/main', '/update'];

app.use('/update', express.static(path.join(__dirname, '../dist')));
app.use('/main', express.static(path.join(__dirname, '/../src_old')));
app.get('/main', (req, res) => res.sendFile(path.join(__dirname, '../src_old', 'index.html')));

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1 ||
      whitelist.some((item) => new RegExp(item).test(origin));
    callback(null, originIsWhitelisted);
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(express.static(path.join(__dirname, '/../build')));
app.get('*', (req, res, next) => {
  if (whitelistNotAvailablePath.indexOf(req.path)) {
    next();
  } else {
    res.sendFile(path.join(__dirname, '/../build', 'index.html'));
  }
});

app.server = http.createServer(app);
// start the app
app.server.listen(PORT, (error) => {
  if (error) {
    console.log(`something bad happened ${error}`); // eslint-disable-line
    return;
  }

  console.log(`listening on ${PORT}...`); // eslint-disable-line
});
