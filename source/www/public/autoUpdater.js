const { app, ipcMain, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = "info";

// Disable auto downloading
autoUpdater.autoDownload = false;

module.exports.checkForUpdates = () => {
  const platform = process.platform;
  const version = app.getVersion();

  autoUpdater.logger.info('version: ' + version + ' platform: ' + platform);
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-available', () => {
    let downloadProgress = 0;

    // Prompt user to update
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Tersedia',
      message: 'Versi baru Equivalen telah tersedia. Apa mau diperbaharui sekarang?',
      buttons: ['Update', 'No'],
    }, (buttonIndex) => {
      if (buttonIndex !== 0) return;

      // Start download and show download progress
      autoUpdater.downloadUpdate();

      let progressWin = new BrowserWindow({
        width: 350,
        height: 35,
        useContentSize: true,
        autoHideMenuBar: true,
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        resizable: false,
      });

      // Load Progress HTML
      progressWin.loadURL(`file://${__dirname}/renderer/progress.html`);

      // Handle window close
      progressWin.on('close', () => {
        progressWin = null;
      });

      // Listen for progress request from progress win
      ipcMain.on('download-progress-request', (e) => {
        autoUpdater.logger.info('download-progress-request', downloadProgress);
        e.returnValue = downloadProgress;
      });

      // track download progress on autoUpdater
      autoUpdater.on('download-progress', (d) => {
        downloadProgress = d.percent;

        autoUpdater.logger.info('download-progress', downloadProgress);
      });

      autoUpdater.on('update-downloaded', () => {
        // Close Progress Win

        if (progressWin) progressWin.close();

        dialog.showMessageBox({
          type: 'info',
          title: 'Update Tersedia',
          message: 'Versi baru Equivalen telah siap. Keluar dan Pasang sekarang?',
          buttons: ['Ya', 'Nanti'],
        }, (buttonIndex) => {
          // Update if "Yes"
          if (buttonIndex === 0) autoUpdater.quitAndInstall();
        });
      });
    });
  });
};
