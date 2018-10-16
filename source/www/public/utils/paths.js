const url = require('url');

const resolveDir = (path, relativePath) => {
  const dir = url.format({
    pathname: path.join(__dirname, '/../../', relativePath),
    protocol: 'file:',
    slashes: true,
  });

  return dir;
};

module.exports = (path) => {
  return {
    video: resolveDir(path, 'assets/video'),
    image: resolveDir(path, 'assets/images'),
  };
};
