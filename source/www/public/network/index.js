const startToPing = require('./ping');
const ElectronOnline = require('./electron-online');

const checkingAvailableInternet = (app) => {
  const connection = new ElectronOnline(app);
  return connection;
};
module.exports = {
  checkingAvailableInternet,
  checkingAvailableServer: startToPing,
};
