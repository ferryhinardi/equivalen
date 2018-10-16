const log = require('electron-log');
const { BrowserWindow } = require('electron');
const { download } = require('electron-dl');

module.exports.downloadVideo = (mainWindow, info) => {
  download(BrowserWindow.getFocusedWindow(), info.uri, {
    directory: './assets/video',
    onProgress: (byte) => {
      log.info('byte', byte);
      mainWindow.webContents.send('on-progress-video', byte);
    },
  })
  .then(dl => console.log(dl.getSavePath()));
};
