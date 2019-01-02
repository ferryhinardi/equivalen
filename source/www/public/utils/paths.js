const path = require('path');
const fileUrl = require('file-url');

const resolveDir = (path, relativePath) => {
  const dir = fileUrl(path.join(__dirname, '..', '..', relativePath));

  return dir;
};

module.exports = (dir) => {
  const pathDir = dir || path;

  return {
    video: resolveDir(pathDir, 'assets/video'),
    image: resolveDir(pathDir, 'assets/images'),
  };
};
