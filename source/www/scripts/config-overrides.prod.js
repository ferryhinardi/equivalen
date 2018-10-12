const rewireDecorators = require("react-app-rewire-decorators-legacy");

module.exports = function(config) {
  config = rewireDecorators(config);

  const target = process.env.TARGET === 'electron' ? 'electron-main' : 'web'; // web => 'web', electron => 'electron-main'
  // Use your own ESLint file
  const eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  // Add the SASS loader second-to-last
  // (last one must remain as the "file-loader")
  const loaderList = config.module.rules[1].oneOf;

  // Update limit load assets
  loaderList[0].options.limit = 120000;

  config.target = target;
};
