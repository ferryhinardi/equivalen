const {ipcMain} = require('electron');

const renderOldApp = (mainWindow) => {
  ipcMain.once('go-to-old-app', () => {
    console.log('main.. on go-to-old-app');
    mainWindow.loadURL(`file://${__dirname}/old_app/index.html`);
    mainWindow.show();
  });
};

module.exports = renderOldApp;
