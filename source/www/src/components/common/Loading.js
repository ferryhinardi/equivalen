// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import Page from './Page';
import { Image } from '../common';
import Colors from '../../utils/colors';

type Props = {
  transparent: boolean,
  type?: 'default' | 'equivalen',
};

const imgLoadingEq = require('../../images/assets/loading-eqv-crop.gif');

const Loading = ({ transparent, type }: Props) => {
  const loadingType = type || 'default';
  let LoadingContent;

  switch(loadingType) {
    case 'default':
      LoadingContent = <ActivityIndicator size="large" />;
      break;
    case 'equivalen':
      LoadingContent = <Image source={imgLoadingEq} size={20} />;
      break;
  }

  return (
    <Page backgroundColor={transparent ? Colors.transparent : Colors.grey}>
      {LoadingContent}
    </Page>
  );
};

export default Loading;
