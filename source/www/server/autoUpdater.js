const {app} = require('electron');
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
const request = require('request');

const UPDATE_SERVER_HOST = "";

// Check for updates every 30 minutes
const UPDATE_INTERVAL = 30 * 60 * 1000;

const justCheckNoUpdate = (window, version) => {
  // poll win32 feed to see if there's a new version...
  const url = `https://${UPDATE_SERVER_HOST}/update/win32/${version}`;

  setInterval(() => {
    request({
      url,
      json: true
    }, (err, resp, body) => {
      if (body && body.name) {
        window.send('manual-update-modal', body.name);
      }
    });
  }, UPDATE_INTERVAL);
};

module.exports.checkForUpdates = (window) => {
  const platform = process.platform;
  const version = app.getVersion();

  log.info("version: " + version);

  if (/node_modules.electron/.test(app.getPath('exe'))) {
    log.info('in dev, skipping updates...');
    return;
  }

  if (platform === "linux") {
    justCheckNoUpdate(window, version);
    return;
  }

  autoUpdater.addListener('update-available', event => {
    log.info('A new update is available');
  });

  autoUpdater.addListener(
    'update-downloaded',
    (event, releaseNotes, releaseName, releaseDate, updateURL) => {
      window.send('show-update-modal', releaseName);
      setTimeout(() => {
        autoUpdater.quitAndInstall();
      }, 1000);
      return true;
    });

  autoUpdater.addListener('error', error => {
    log.error(error);
  });

  autoUpdater.addListener('checking-for-update', event => {
    log.info('checking-for-update');
  });

  autoUpdater.addListener('update-not-available', () => {
    log.info('update-not-available');
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
  });

  const updatePlatform = platform === 'darwin' ? 'osx' : 'win32';
  const feedUrl = `https://${UPDATE_SERVER_HOST}/update/${updatePlatform}/${version}`;
  log.info(feedUrl);

  autoUpdater.setFeedURL(feedUrl);
  /*
    autoUpdater.requestHeaders = { "PRIVATE-TOKEN": "yF3wPAAuoRAspkso42A-" };
    autoUpdater.autoDownload = true;

    autoUpdater.setFeedURL({
      provider: 'generic',
      url: 'https://gitlab.com/ferry_hinardi/equivalent/-/jobs/artifacts/master/raw/dist?job=build'
    });
  */

 window.webContents.once('did-frame-finish-load', () => {
    autoUpdater.checkForUpdates();

    setInterval(function() {
      autoUpdater.checkForUpdates();
    }, UPDATE_INTERVAL);
  });
};

module.exports.applyUpdate = () => {
  autoUpdater.quitAndInstall();
};
