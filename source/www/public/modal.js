const {ipcRenderer} = require('electron');
console.log('masuk renderer modal 1');

document.getElementById('close').onclick = function() {
  console.log('close modal');
};

window.onload = function() {
  console.log('masuk renderer modal 2');
};

ipcRenderer.on('store-data', (event, data) => {
  console.log('renderer modalAttr', data);
});
