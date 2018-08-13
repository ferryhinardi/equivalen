const {ipcRenderer} = require('electron');
const log = require('electron-log');

log.transports.file.level = "info";

log.info('masuk renderer modal 1');

// window.onload = () => {
//   document.getElementById('close').onclick = function() {
//     log.info('close modal');
//   };

// };

ipcRenderer.on('store-data', (event, data) => {
  alert('store-data');
  // document.getElementById('modal-title').innerHTML = 'Pilih Tryout';
  // log.info('renderer modalAttr', JSON.stringify(data));
});
