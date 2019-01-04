const { app } = require('electron');
const path = require('path');
const fileUrl = require('file-url');

const resolveDir = (__dirname, relativePath) => {
  const dir = fileUrl(path.join(__dirname, relativePath));

  return dir;
};

module.exports = () => {
  return {
    video: resolveDir(app.getPath('videos'), 'Equivalen/videos'),
    image: resolveDir(__dirname, '../../assets/images'),
  };
};
