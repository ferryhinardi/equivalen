// @flow

const path = require('path');
const resolvePkg = require('resolve');

const values = new Promise((resolve, reject) => {
  const electronConnectPath = require.resolve('equivalen-electron-connect');
  const wsReconnectPath = require.resolve('equivalen-ws-reconnect');
  const reactNavigationPath = require.resolve('react-navigation');
  const reactNavigationTabsPath = require.resolve('react-navigation-tabs');
  const reactNavigationDrawerPath = require.resolve('react-navigation-drawer');
  const reactNativeTabViewPath = require.resolve('react-native-tab-view');
  const reactNavigationStackPath = require.resolve('react-navigation-stack');
  const pathExists = require.resolve('path-exists');

  /**
   * @return './node_modules/electron-connect/node_modules/ws/index.js'
   */
  const wsEc = resolvePkg.sync('ws', { basedir: electronConnectPath });
  const wsRecon = resolvePkg.sync('ws', { basedir: wsReconnectPath });
  const tabViewReactNavigation = resolvePkg.sync('react-native-tab-view', { basedir: reactNavigationTabsPath });
  // const reactNativeScreenPath = require.resolve('react-native-screens');
  // const reactNavigationDeprecatedTabNavigator = require.resolve('react-navigation-deprecated-tab-navigator');

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
  const libsRNTabView = [
    path.join(reactNativeTabViewPath, '..', 'index.js'),
    path.join(reactNativeTabViewPath, '..', 'PagerPan.js'),
    path.join(reactNativeTabViewPath, '..', 'TabBar.js'),
    path.join(reactNativeTabViewPath, '..', 'TouchableItem.js'),
    path.join(reactNativeTabViewPath, '..', 'TabViewPagerPan.js'),
    path.join(reactNativeTabViewPath, '..', 'SceneMap.js'),
    path.join(reactNativeTabViewPath, '..', 'TabViewPagerAndroid.web.js'),
    path.join(reactNativeTabViewPath, '..', 'TabViewPagerScroll.js'),
    path.join(reactNativeTabViewPath, '..', 'TabViewAnimated.js'),
    path.join(reactNativeTabViewPath, '..', 'TabViewPagerExperimental.js'),
  ];
  const libsNavigationTabs = [
    path.join(reactNavigationTabsPath, '..', 'navigators', 'createMaterialTopTabNavigator.js'),
    path.join(reactNavigationTabsPath, '..', 'navigators', 'createBottomTabNavigator.js'),
    path.join(reactNavigationTabsPath, '..', 'views', 'ResourceSavingScene.js'),
    path.join(reactNavigationTabsPath, '..', 'views', 'BottomTabBar.js'),
    path.join(reactNavigationTabsPath, '..', 'views', 'CrossFadeIcon.js'),
    path.join(reactNavigationTabsPath, '..', 'views', 'MaterialTopTabBar.js'),
    path.join(reactNavigationTabsPath, '..', 'utils', 'withDimensions.js'),
    path.join(reactNavigationTabsPath, '..', 'utils', 'createTabNavigator.js'),
  ];
  const libsNavigationDrawer = [
    path.join(reactNavigationDrawerPath, '..', 'navigators', 'createDrawerNavigator.js'),
    path.join(reactNavigationDrawerPath, '..', 'routers', 'DrawerActions.js'),
    path.join(reactNavigationDrawerPath, '..', 'routers', 'DrawerRouter.js'),
    path.join(reactNavigationDrawerPath, '..', 'views', 'DrawerSidebar.js'),
    path.join(reactNavigationDrawerPath, '..', 'views', 'DrawerView.js'),
    path.join(reactNavigationDrawerPath, '..', 'views', 'ResourceSavingScene.js'),
    path.join(reactNavigationDrawerPath, '..', 'views', 'DrawerNavigatorItems.js'),
    path.join(reactNavigationDrawerPath, '..', 'views', 'TouchableItem.js'),
    path.join(reactNavigationDrawerPath, '..', 'views', 'DrawerLayout.js'),
  ];
  const libsNavigationStack = [
    path.join(reactNavigationStackPath, '..', 'views', 'ScenesReducer.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'StackView', 'StackView.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'StackView', 'createPointerEventsContainer.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'StackView', 'StackViewCard.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'StackView', 'StackViewLayout.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'StackView', 'StackViewTransitionConfigs.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'Header', 'Header.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'Header', 'HeaderTitle.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'Header', 'HeaderBackButton.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'Header', 'ModularHeaderBackButton.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'Transitioner.js'),
    path.join(reactNavigationStackPath, '..', 'views', 'TouchableItem.js'),
  ];
  const libsNavigationNative = [
    path.join(__dirname, '..', 'node_modules', '@react-navigation', 'native', 'dist', 'createAppContainer.js'),
    path.join(__dirname, '..', 'node_modules', '@react-navigation', 'native', 'dist', 'withOrientation.js'),
    path.join(__dirname, '..', 'node_modules', '@react-navigation', 'native', 'dist', 'ResourceSavingSceneView.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native', 'Libraries', 'Animated', 'src', 'AnimatedEvent.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native', 'Libraries', 'Animated', 'src', 'NativeAnimatedHelper.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native', 'Libraries', 'Animated', 'src', 'nodes', 'AnimatedValue.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native', 'Libraries', 'Animated', 'src', 'nodes', 'AnimatedWithChildren.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native', 'Libraries', 'Animated', 'src', 'nodes', 'AnimatedNode.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native', 'Libraries', 'Animated', 'src', 'nodes', 'AnimatedInterpolation.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native-gesture-handler', 'Swipeable.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native-gesture-handler', 'DrawerLayout.js'),
    path.join(__dirname, '..', 'node_modules', 'react-native-gesture-handler', 'GestureHandler.js'),
  ];
  const libsReactNavigationPath = [
    path.join(reactNavigationPath, '..', 'createNavigationContainer.js'),
    path.join(reactNavigationPath, '..', 'getNavigation.js'),
    path.join(reactNavigationPath, '..', 'getChildNavigation.js'),
    path.join(reactNavigationPath, '..', 'getChildEventSubscriber.js'),
    path.join(reactNavigationPath, '..', 'StateUtils.js'),
    path.join(reactNavigationPath, '..', 'NavigationActions.js'),
    path.join(reactNavigationPath, '..', 'routers', 'StackActions.js'),
    path.join(reactNavigationPath, '..', 'routers', 'pathUtils.js'),
    path.join(reactNavigationPath, '..', 'routers', 'TabRouter.js'),
    path.join(reactNavigationPath, '..', 'routers', 'SwitchRouter.js'),
    path.join(reactNavigationPath, '..', 'routers', 'StackRouter.js'),
    path.join(reactNavigationPath, '..', 'routers', 'createConfigGetter.js'),
    path.join(reactNavigationPath, '..', 'views', 'SwitchView', 'SwitchView.js'),
    path.join(reactNavigationPath, '..', 'views', 'withOrientation.js'),
    path.join(reactNavigationPath, '..', 'views', 'ResourceSavingSceneView.js'),
    path.join(reactNavigationPath, '..', 'views', 'NavigationEvents.js'),
    path.join(reactNavigationPath, '..', 'views', 'NavigationContext.js'),
    path.join(reactNavigationPath, '..', 'views', 'withNavigation.js'),
    path.join(reactNavigationPath, '..', 'views', 'withNavigationFocus.js'),
    path.join(reactNavigationPath, '..', 'views', 'SceneView.js'),
    path.join(reactNavigationPath, '..', 'navigators', 'createKeyboardAwareNavigator.js'),
    path.join(reactNavigationPath, '..', 'navigators', 'createNavigator.js'),
  ];
  const libsRNTabViewTabs = [
    path.join(tabViewReactNavigation, '..', 'index.js'),
    path.join(tabViewReactNavigation, '..', 'PagerPan.js'),
    path.join(tabViewReactNavigation, '..', 'TabBar.js'),
    path.join(tabViewReactNavigation, '..', 'TabView.js'),
    path.join(tabViewReactNavigation, '..', 'TouchableItem.js'),
    path.join(tabViewReactNavigation, '..', 'SceneMap.js'),
    path.join(tabViewReactNavigation, '..', 'PagerAndroid.web.js'),
    path.join(tabViewReactNavigation, '..', 'PagerScroll.js'),
    path.join(tabViewReactNavigation, '..', 'PagerExperimental.js'),
  ];
  // const libsTabNavigatorDeprecated = [
  //   path.join(reactNavigationDeprecatedTabNavigator, '..', 'createTabNavigator.js'),
  //   path.join(reactNavigationDeprecatedTabNavigator, '..', 'views', 'TabBarBottom.js'),
  //   path.join(reactNavigationDeprecatedTabNavigator, '..', 'views', 'TabBarIcon.js'),
  //   path.join(reactNavigationDeprecatedTabNavigator, '..', 'views', 'TabView.js'),
  //   path.join(reactNavigationDeprecatedTabNavigator, '..', 'views', 'TabBarTop.js'),
  // ];
  // const libsRNScreen = [
  //   path.join(reactNativeScreenPath, '..', 'screens.web.js'),
  // ];

  /* $FlowFixMe */
  const returnValues = []
    .concat(libsWs)
    .concat(libsEc)
    .concat(libsRNTabView)
    .concat(libsNavigationTabs)
    .concat(libsNavigationDrawer)
    .concat(libsNavigationStack)
    .concat(libsNavigationNative)
    .concat(libsReactNavigationPath)
    .concat(libsRNTabViewTabs)
    .concat([
      pathExists,
    ]);

  resolve(returnValues);
});

module.exports = values;
