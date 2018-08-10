const {dialog} = require('electron');

const showUploadDialog = () => {
  dialog.showOpenDialog({
    defaultPath: '~/Download',
    buttonLabel: 'Select',
  }, (openPath) => {
    console.log('openPath', openPath);
  });
};

const showMessageDialog = (options) => {
  dialog.showMessageBox({
    type: 'info',
    title: options.title,
    message: options.message,
    buttons: options.buttons,
  })
};

exports.showMessageDialog = showMessageDialog;
exports.showUploadDialog = showUploadDialog;
