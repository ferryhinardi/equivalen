const electron = require('@equivalen/electron-connect').server.create();

const data = ['1', '2', '3'];

module.exports = () => {
  electron.start((state, wss) => {
    wss.on('socket-data', (data) => {
      wss.emit('socket-data', data);
    });
  });
};
