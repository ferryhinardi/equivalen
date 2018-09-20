const { ipcMain } = require('electron');
const log = require('electron-log');
const createWindow = require('./createWindow');
const store = require('./store');
const { showUploadDialog, showMessageDialog } = require('./dialog');
const generatePdf = require('./generatePdf');

log.transports.file.level = 'info';

module.exports.communication = mainWindow => {
  ipcMain.on('show-upload-popup', (event, args) => {
    log.info('main show-upload-popup', args);
    showUploadDialog();
  });

  ipcMain.on('show-message-popup', (event, args) => {
    log.info('main show-message-popup', args);
    showMessageDialog(args);
  });

  ipcMain.on('set-store-data', (event, args) => {
    log.info('SET-STORE-DATA', JSON.stringify(args));
    store.set(args.key, args.value);
  });

  ipcMain.on('get-store-data', (event, args) => {
    log.info('GET-STORE-DATA', JSON.stringify(args));
    const value = store.get(args.key) || null;
    log.info('data', value);
    event.returnValue = value;
  });

  ipcMain.on('remove-store-data', (event, args) => {
    log.info('REMOVE-STORE-DATA', JSON.stringify(args));
    store.remove(args.key);
  });

  ipcMain.on('remove-all-store-data', () => {
    log.info('REMOVE-ALL-STORE-DATA');
    store.removeAll();
  });

  ipcMain.on('show-result-pdf', (event, args) => {
    log.info('SHOW-RESULT-PDF', JSON.stringify(args));
    generatePdf.openResultPdf(mainWindow, args);
  });

  ipcMain.on('show-modal-popup', (event, args) => {
    log.info('main show-modal-popup', args);
    const url = `file://${__dirname}/renderer/modal.html`;
    const modalWindow = createWindow({
      url,
      opts: {
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
