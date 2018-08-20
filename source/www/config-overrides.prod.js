// const path = require('path');
// const OUTPUT_DIR = path.resolve(__dirname, 'build');

module.exports = function(config) {
  // Use your own ESLint file
  const eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  // Add the SASS loader second-to-last
  // (last one must remain as the "file-loader")
  const loaderList = config.module.rules[1].oneOf;
  loaderList.splice(0, 0, {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve('url-loader'),
    options: {
      limit: 50000,
      name: 'static/media/[name].[hash:8].[ext]',
    },
  });
  config.target = 'electron-main';  // web => 'web', electron => 'electron-main'
};
