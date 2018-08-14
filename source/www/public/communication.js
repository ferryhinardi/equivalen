const {ipcMain} = require('electron');
const log = require('electron-log');
const generate = require('../scripts/generateBase64Soal');
const createWindow = require('./createWindow');
const {showUploadDialog, showMessageDialog} = require('./dialog');

log.transports.file.level = "info";

module.exports.communication = (mainWindow) => {
  ipcMain.on('show-upload-popup', (event, args) => {
    log.info('main show-upload-popup', args);
    showUploadDialog();
  });

  ipcMain.on('show-message-popup', (event, args) => {
    log.info('main show-message-popup', args);
    showMessageDialog(args);
  });

  ipcMain.on('generate-question', (event, args) => {
    generate.generateBase64Dir(args);
  });

  ipcMain.on('show-modal-popup', (event, args) => {
    log.info('main show-modal-popup', args);
    const url = `file://${__dirname}/modal.html`;
    const modalWindow = createWindow({
      url,
      otps: {
        backgroundColor: '#777',
        width: 200,
        parent: mainWindow,
        frame: false,
      },
    });

    modalWindow.setFullScreen(false);
    modalWindow.webContents.on('did-finish-load', () => {
      modalWindow.webContents.send('store-data', 'masuk');
    });
    modalWindow.on('ready-to-show', () => {
      modalWindow.show();
    });
  });
};
