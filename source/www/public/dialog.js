const {dialog} = require('electron');

const showFileDialog = (properties, callback) => {
  dialog.showOpenDialog({
    defaultPath: '~/Download',
    buttonLabel: 'Select',
    properties,
  }, (openPath) => {
    callback && callback(openPath);
  });
};

const showMessageDialog = (options, callback) => {
  dialog.showMessageBox({
    type: options.type || 'info',
    title: options.title,
    message: options.message,
    buttons: options.buttons,
  }, callback)
};

const showErrorDialog = (options) => {
  dialog.showErrorBox(options.title, options.message);
};

exports.showMessageDialog = showMessageDialog;
exports.showFileDialog = showFileDialog;
exports.showErrorDialog = showErrorDialog;
