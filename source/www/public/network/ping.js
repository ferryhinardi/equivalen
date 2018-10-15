const log = require('electron-log');
const tcpp = require('tcp-ping');
const store = require('../utils/persistStore');
const R = require('ramda');

let ipc = null;
let interval = null;
let lastSeenState = null;

const intervalDuration = 1000;
const getHost = () => R.isEmpty(store.get('ipAddress')) ? '127.0.0.1' : store.get('ipAddress');
const portDomain = 4000;

const maybeNotify = (lastResponseIsAlive) => {
  if (lastResponseIsAlive !== lastSeenState) {
    if (lastResponseIsAlive === true) {
      ipc.send('status-connection', 'ONLINE');
    } else if (lastResponseIsAlive === false) {
      ipc.send('status-connection', 'OFFLINE');
    }
    lastSeenState = lastResponseIsAlive;
  }
};

const onRecievePing = (err, available) => {
  log.info('pingResponse', available);
  const lastResponseIsAlive = available;
  maybeNotify(lastResponseIsAlive);
};

const doThePing = () => {
  tcpp.probe(getHost(), portDomain, onRecievePing);
};

const startToPing = (opts) => {
  ipc = opts.ipc;
  interval = setInterval(doThePing, intervalDuration);
};

const destroyInterval = () => {
  if(interval) clearInterval(interval);
};

module.exports.destroy = destroyInterval;
module.exports = startToPing;
