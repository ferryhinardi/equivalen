// @flow

import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import gql from 'graphql-tag';
import { RouterContextConsumer } from '../context/router.context';
import type { History } from '../types.shared';
import Colors from '../../utils/colors';

type Props = {
  withContextProvider?: boolean,
  children: React$Node,
  backgroundColor?: string,
  backgroundImage?: any,
  flexDirection?: 'row' | 'column',
  maxWidth?: number,
  minWidth?: number,
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  isFullWidth?: boolean,
};

const styles = {
  body: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    overflow: 'auto',
  },
  content: {
    height: '100%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const QUERY_GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      isStudent
      isTeacher
      userTeacher {
        courses {
          name
        }
      }
    }
  }
`;

const PageContext: Object = React.createContext();
const PageProvider = ({ children }: {children: React$Node}) => (
  <RouterContextConsumer>
    {({ history }: { history: History }) => (
      <Query query={QUERY_GET_CURRENT_USER}>
        {({ loading, data }) => {
          if (loading === false && !data) {
            history.replace('/login');
          }

          const currentUser = get(data, 'currentUser', {});

          return (
            <PageContext.Provider value={{ currentUser, loading }}>
              {children}
            </PageContext.Provider>
          );
        }}
      </Query>
    )}
  </RouterContextConsumer>
);

export const PageConsumer = PageContext.Consumer;

export class Page extends Component<Props> {
  static defaultProps = {
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 360,
    minWidth: 360,
  };

  getContent = (currentUser?: Object) => {
    let { maxWidth, minWidth, backgroundColor } = this.props;
    const {
      children,
      backgroundImage,
      flexDirection,
      justifyContent,
      isFullWidth,
    } = this.props;
    let width = null;
    if (isFullWidth) {
      maxWidth = 'unset';
      minWidth = 'unset';
      width = '100%';
    }

    const isStudent = get(currentUser, 'isStudent');
    const isTeacher = get(currentUser, 'isTeacher');

    if (isStudent) {
      backgroundColor = Colors.yellowBackground;
    } else if (isTeacher) {
      backgroundColor = Colors.grey;
    }

    const style = Object.assign({}, styles.body, { backgroundColor });

    return (
      <View style={style}>
        {backgroundImage ? (
          <ImageBackground
            source={backgroundImage}
            imageStyle={[styles.imageBackground, { resizeMode: 'cover' }]}
            style={styles.content}
            resizeMode="cover">
            {children}
          </ImageBackground>
        ) : (
          <View style={[styles.content, { flexDirection, maxWidth, minWidth, justifyContent, width }]}>
            {children}
          </View>
        )}
      </View>
    );
  };

  render() {
    const { withContextProvider } = this.props;

    return withContextProvider ? (
      <PageProvider>
        <PageConsumer>
          {({ currentUser }) => (
            this.getContent(currentUser)
          )}
        </PageConsumer>
      </PageProvider>
    ) : this.getContent();
  }
}

export default Page;
