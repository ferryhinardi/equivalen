const path = require('path');
const resolve = require('resolve');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rewireDecorators = require("react-app-rewire-decorators-legacy");

const electronConnectPath = require.resolve('@equivalen/electron-connect');
const wsReconnectPath = require.resolve('@equivalen/ws-reconnect');
/**
 * @return './node_modules/electron-connect/node_modules/ws/index.js'
 */
const wsEc = resolve.sync('ws', { basedir: electronConnectPath });
const wsRecon = resolve.sync('ws', { basedir: wsReconnectPath });
const libFiles = [
  'buffer-util.js',
  'constants.js',
  'event-target.js',
  'extension.js',
  'permessage-deflate.js',
  'receiver.js',
  'sender.js',
  'validation.js',
  'websocket.js',
  'websocket-server.js',
];
const libsWs = libFiles.reduce((res, file) =>
  res.concat([
    path.join(wsEc, '..', 'lib', file),
    path.join(wsRecon, '..', 'lib', file),
  ])
, []);
const libsEc = [
  path.join(electronConnectPath, '..', 'lib', 'server.js'),
];

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
  loaderList[0].options.limit = 10000;
  // enable minify node_modules
  loaderList[1].include = [loaderList[1].include]
    .concat([require.resolve('path-exists')])
    .concat(libsWs)
    .concat(libsEc);

  // add custom env define plugin
  config.plugins[2].definitions['process.env'].ASSETS_DIR = `"./assets"`;

  config.plugins = config.plugins.concat([
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
    ]),
  ]);

  config.target = target;
};
