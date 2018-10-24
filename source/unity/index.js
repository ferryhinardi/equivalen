const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer');
const mime = require('mime-types')
const cors = require('cors');
const moment = require('moment');
// const WebSocket = require('./ws');

moment.locale('id');

const app = http.createServer();

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

// const ws = new WebSocket();

app.on('/', (req, res) => {
  res.sendStatus(200);
});

app.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/live') {
    // ws.instance.wss.handleUpgrade(request, socket, head, function done(ws) {
    //   ws.instance.wss.emit('connection', ws, request);
    // });
  } else {
    socket.destroy();
  }
});

// const server = app.listen(4000, () => {
//   console.log('Server is Listening on port', server.address().port);
// });

// app.use(cors(corsOptions));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/upload', upload.single('data'), (req, res) => {
//   res.sendStatus(200);
// });
