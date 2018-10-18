const fileUrl = require('file-url');

const resolveDir = (path, relativePath) => {
  const dir = fileUrl(path.join(__dirname, '/../../', relativePath));

  return dir;
};

module.exports = (path) => {
  return {
    video: resolveDir(path, 'assets/video'),
    image: resolveDir(path, 'assets/images'),
  };
};
