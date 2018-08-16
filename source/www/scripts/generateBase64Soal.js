const fs = require('fs');
const path = require('path');
const basename  = path.basename(module.filename);
const {base64Encode} = require('../src/utils/image');

// const matpel = process.env.MAT_PEL || '';
const sortMethod = (a, b) => {
  const numberA = parseInt(a.split('-')[0], 10);
  const numberB = parseInt(b.split('-')[0], 10);

  if (numberA < numberB) {
    return -1;
  }
  if (numberA > numberB) {
    return 1;
  }

  return 0;
};
const format = 'data:image/png;base64,';
function write(stream, keyField, data) {
  if (!stream.write(`'${keyField}': '${data}'` + ',\n')) {
    return;
  }
  stream.end();
}

module.exports.generateBase64Dir = ({matpel}) => {
  const dirMatPel = path.join(
    __dirname,
    '/../',
    'src/images/assets_matpel',
    matpel
  );
  // Create File Images
  let stream = null;

  (function load(dir) {
    fs
      .readdirSync(dir)
      .filter((file) => {
        return (file.indexOf('-soal') !== -1) && (file !== basename);
      })
      .sort(sortMethod)
      .forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const fileStr = filePath.split('/');
        if (stat.isDirectory()) {
          const tryoutDir = fileStr[fileStr.length - 1];
          const tryout = tryoutDir.split('-')[0];

          stream = fs.createWriteStream(path.join(dirMatPel, `/images-to-${tryout}.js`));
          stream.write('const images = {' + '\n');
          stream.write(`// TRYOUT-${tryout}` + '\n');

          load(filePath);
        } else {
          const base64 = `${format}${base64Encode(filePath)}`;
          const tryoutName = fileStr[fileStr.length - 2];
          const tryoutNumber = tryoutName[0];
          const fileName = fileStr[fileStr.length - 1];
          const questionNumber = fileName.split('-')[0];
          const keyField = `to-${tryoutNumber}-soal-${questionNumber}`;

          write(stream, keyField, base64);
        }
      });
      stream.write('};' + '\n');
  }(dirMatPel));
};
