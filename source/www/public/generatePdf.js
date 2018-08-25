const path = require('path');
const url = require('url');
const fs = require('fs');
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

module.exports.openResultPdf = (mainWindow) => {
  const windowToPDF = createWindow({
    url: url.format({
      pathname: path.join(__dirname, '/../build/pdfResult.html'),
      protocol: 'file:',
      slashes: true,
    }),
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
