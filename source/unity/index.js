const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const multer = require('multer');
const mime = require('mime-types')
const cors = require('cors');
const moment = require('moment');
const app = express();

moment.locale('id');

// require('./detectIpLocal');

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
      const originIsWhitelisted =
        whitelist.indexOf(origin) !== -1 || whitelist.some((item) => new RegExp(item).test(origin));
      callback(null, originIsWhitelisted);
  },
};
const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './uploads');
    },
    filename: (req, file, cb) => {
      const mimetype = file.mimetype;
      const ext = mime.extension(mimetype);
      const currentDate = moment().format('LLL');
      const fileName = `${req.body.filename}-${currentDate}.${ext}`;
      cb(null, fileName);
    },
  }),
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/check-status', (req, res) => {
  res.sendStatus(200);
});

app.post('/upload', upload.single('data'), (req, res) => {
  res.sendStatus(200);
});

const server = app.listen(3001, () => {
  console.log('Server is Listening on port', server.address().port);
});
