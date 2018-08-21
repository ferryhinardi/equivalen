const {BrowserWindow} = require('electron');
const fs = require('fs');

const windowToPDF = new BrowserWindow({show : false});
windowToPDF.loadURL('anylink.html'); // template pdf

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

windowToPDF.webContents.printToPDF(pdfSettings(), function(err, data) {
  if (err) {
    //do whatever you want
    return;
  }

  try{
    fs.writeFileSync('./generated_pdf.pdf', data);
  }catch(err){
    //unable to save pdf..
  }
})
