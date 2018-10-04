const { globalShortcut } = require('electron');
const path = require('path');
const modal = require('./modal');

const modalDataHostProxy = {
  'modal-title': 'Host Proxy',
  'modal-content': `<div><input id='ipAddress' class='input' placeholder='IP Address' /></div>`,
};

module.exports.applyShortcut = (mainWindow) => {
  globalShortcut.register('CommandOrControl+N', () => {
    const instance = modal
      .createModalWindow(mainWindow, { frame: false, width: 600, height: 400 });

    instance.on('send', (webContents) => {
      const initialFn = `
        function submit(e) {
          e.preventDefault();

          const ipAddress = document.getElementById('ipAddress').value;
          require('electron').ipcRenderer.send('get-ip-address-proxy', ipAddress);
          require('electron').remote.getCurrentWindow().close();
        }

        const divBodyModal = document.getElementById('body-modal');
        if (divBodyModal) {
          const formBodyModal = document.createElement('form');
          formBodyModal.innerHTML = divBodyModal.innerHTML;
          formBodyModal.onsubmit = submit;

          divBodyModal.parentNode.replaceChild(formBodyModal, divBodyModal);
        }

        document.getElementById('modal-title').innerHTML = "${modalDataHostProxy['modal-title']}";
        document.getElementById('modal-content').innerHTML = "${modalDataHostProxy['modal-content']}";
        const submitButton = document.createElement('button');
        submitButton.setAttribute("class", "button-modal");
        submitButton.setAttribute("style", "background-color: blue");
        submitButton.innerHTML = "Submit";
        submitButton.onclick = submit;
        document.getElementById('footer-modal').appendChild(submitButton);
      `;

      webContents.send('initial', initialFn);
    });
  });
};
