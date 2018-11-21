// @flow

const path = require('path');
const resolve = require('resolve');
const electronConnectPath = require.resolve('equivalen-electron-connect');
const wsReconnectPath = require.resolve('equivalen-ws-reconnect');

/**
 * @return './node_modules/electron-connect/node_modules/ws/index.js'
 */
const wsEc = resolve.sync('ws', { basedir: electronConnectPath });
const wsRecon = resolve.sync('ws', { basedir: wsReconnectPath });
const tabViewReactNavigation = resolve.sync('react-native-tab-view', { basedir: reactNavigationTabsPath });
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
const pathExists = require.resolve('path-exists');

/* $FlowFixMe */
const returnValues = []
  .concat(libsWs)
  .concat(libsEc)
  .concat([
    pathExists,
  ]);

module.exports = returnValues;
