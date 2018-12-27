const path = require('path');
const log = require('electron-log');
const { app, BrowserWindow } = require('electron');
const { download } = require('electron-dl');
const { getenc } = require('./encryptFile');

const videoDir = path.join(app.getAppPath(), '..', 'assets', 'video');

module.exports.downloadVideo = (mainWindow, info) => {
  download(BrowserWindow.getFocusedWindow(), info.uri, {
    directory: videoDir,
    onProgress: (byte) => {
      log.info('byte', byte);
      mainWindow.webContents.send('on-progress-video', byte);
    },
  })
  .then(dl => {
  	const filepath = dl.getSavePath();
	const password = 'secret';

	// return getenc(filepath, password, (err, res) => {
	// 	if (err) {
	// 		throw new Error('Error during encryption.');
	// 	}

	// 	console.log('res', res);
	// 	return res;
	// })
  });
};
