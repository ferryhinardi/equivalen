const startToPing = require('./ping');
const ElectronOnline = require('./electron-online');

module.exports.checkingAvailableInternet = (app) => {
  const connection = new ElectronOnline(app);
  return connection;
};
module.exports.checkingAvailableServer = startToPing;
