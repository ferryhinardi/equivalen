const startToPing = require('./ping');
const ElectronOnline = require('./electron-online');
const socket = require('./socket');

const checkingAvailableInternet = (app) => {
  const connection = new ElectronOnline(app);
  return connection;
};
module.exports = {
  checkingAvailableInternet,
  checkingAvailableServer: startToPing,
  socket,
};
