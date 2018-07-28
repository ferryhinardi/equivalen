import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {Page} from '../common';

class PageNotFound extends PureComponent {
  render() {
    return (
      <Page>
        <Text>Page tidak ditemukan</Text>
      </Page>
    )
  }
}

export default PageNotFound;
