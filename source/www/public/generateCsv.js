// Config Excel
// https://superuser.com/questions/238944/how-to-force-excel-to-open-csv-files-with-data-arranged-in-columns

const fs = require('fs');
// const fs = require('crypto-fs');
const csv = require('csv');
const log = require('electron-log');
const {
  showFileDialog,
  showMessageDialog,
  showErrorDialog,
} = require('./dialog');
const store = require('./store');
/*
fs.init({
  baseFs: require('fs'),
  algorithm: 'aes-256-ctr',
  prefix: '',
  password: 'P4ssw0rd-01',
  root: './',
  iv: null,
  realSize: false,
  dontEncPath : false
});
*/
module.exports.createCsv = (params) => {
  params.name = store.get('username') || "";
  params.className = store.get('class') || "";

  params.mapAnswers = [];
  params.answers.forEach((value, idx) => {
    const mod = idx % 10;

    if (params.mapAnswers[mod]) {
      params.mapAnswers[mod] = params.mapAnswers[mod].concat([value.no, value.answer]);
    } else {
      params.mapAnswers[mod] = [value.no, value.answer];
    }
  });

  const data = [
    ['Hasil Latihan', '', '', '', '', '', 'Nilai', ''],
    ['\n'],
    ['Nama', ':', params.name, '', '', '', 'Jawaban Benar', ':', params.correctAns],
    ['Matapelajaran', ':', params.matpel, '', '', '', 'Jawaban Salah', ':', params.wrongAns],
    ['Paket Tryout', ':', params.to, '', '', '', 'Jawaban Ragu-ragu', ':', params.doubtAns],
    ['Jumlah Soal', ':', params.totalQuestion, '', '', '', 'Tidak dijawab', ':', params.unAnswer],
    ['Tanggal', ':', params.date],
    ['Lama Waktu', ':', params.duration],
    ['\n'],
    ...params.mapAnswers,
  ];

  log.info('params', params);

  showFileDialog(['openDirectory'], (path) => {
    const filePath = path && path.length > 0 ? path[0] : '~/Downloads';

    try {
      const callback = (err, dataToWrite) => {
        if (err) {
          return;
        }

        fs.writeFile(
          `${filePath}/${params.name}_${params.className}.csv`,
          dataToWrite,
          'utf8',
          (err) => {
            if (err) throw err;

            showMessageDialog({
              title: 'Download Complated',
              message: `Download PDF successfully`,
            });
          });
      };
      csv.stringify(data, callback);
    } catch(err) {
      //unable to save pdf..
      showErrorDialog({
        title: 'Download Abort',
        message: 'Download PDF failed.',
      });
    }
  });
};
