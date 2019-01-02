const path = require('path');
const log = require('electron-log');
const { app, BrowserWindow } = require('electron');
const { download } = require('electron-dl');
const { encryptFile, decryptFile } = require('./encryptFile');

const videoDir = path.join(app.getAppPath(), 'assets', 'video');
const key = 'secret';

const Network = {};

Network.downloadVideo = (mainWindow, info, filename) => {
  download(BrowserWindow.getFocusedWindow(), info.uri, {
    directory: videoDir,
    onProgress: (byte) => {
      log.info('byte', byte);
      mainWindow.webContents.send('on-progress-video', byte);
    },
  })
  .then(dl => {
  	const filepath = dl.getSavePath();
    const fileEncryptPath = `${videoDir}/${filename}.min`;

    encryptFile(filepath, fileEncryptPath, key, function(err) {
      // Encryption complete.
      if (err) throw new Error('Failed Encrypt File');
    });
  });
};

Network.openVideo = (fileEncryptPath, filename) => {
  const fileDecryptPath = `${videoDir}/${filename}`;
  return new Promise((resolve, reject) => {
    decryptFile(fileEncryptPath, fileDecryptPath, key, (tempFilePath) => {
      resolve(tempFilePath);
    });
  });
};

module.exports = Network;
