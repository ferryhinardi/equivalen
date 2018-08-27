const path = require('path');
const fs = require('fs');
const mustache = require('mustache');
const log = require('electron-log');
const createWindow = require('./createWindow');
const {showFileDialog, showMessageDialog, showErrorDialog} = require('./dialog');

const settingCache = {
  getPrintPaperSize: () => 1,
};

function pdfSettings() {
  const paperSizeArray = ["A4", "A5"];
  const option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: paperSizeArray[settingCache.getPrintPaperSize() - 1],
  };
  return option;
}

module.exports.openResultPdf = (mainWindow, params) => {
  params.name = "Name_Testing";
  log.info('params', params);
  const template = fs.readFileSync(path.join(__dirname, './pdfResult.html'), 'utf8');
  const templatePdf = mustache.render(template, params);
  const windowToPDF = createWindow({
    url: `data:text/html;charset=UTF-8,${templatePdf}`,
    otps: {width: 595, height: 842, parent: mainWindow},
  });

  showFileDialog(['openDirectory'], (path) => {
    const filePath = path && path.length > 0 ? path[0] : '~/Downloads';

    windowToPDF.webContents.printToPDF(pdfSettings(), (err, data) => {
      if (err) {
        //do whatever you want
        return;
      }

      try {
        fs.writeFileSync(`${filePath}/generated_pdf.pdf`, data);
        showMessageDialog({
          title: 'Download Complated',
          message: `Download PDF successfully in ${filePath}`,
          buttons: ['open'],
        }, (buttonIndex) => {
          if (buttonIndex === 0) {
            windowToPDF.show();
          }
        });
      } catch(err) {
        //unable to save pdf..
        showErrorDialog({
          title: 'Download Abort',
          message: 'Download PDF failed.',
        });
      }
    });
  });

  // windowToPDF.once('ready-to-show', () => {
  //   windowToPDF.show();
  // });
}
