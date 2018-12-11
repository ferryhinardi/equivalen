// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import get from 'lodash/get';
import TeacherMyArchiveView from './TeacherMyArchiveView';
import { HeaderBackButton, Divider, Loading } from '../common';
import FooterMenu from '../menu/FooterMenu';
import Colors from '../../utils/colors';

type Props = {
  loading: boolean,
  data: Object,
  user: Object,
  props: Object,
  onLoadMore?: () => void,
};

class MyArchiveListView extends Component<Props> {
  getFooterComponent = () => this.props.loading ? <Loading /> : null;

  _onRightMenuClick = (history) => {
    history.transitionTo('/archive-input');
  };

  render() {
    const { data, props } = this.props;
    const title = 'ARSIP SAYA';
    const archivesData = get(data, 'archives');
    const ComponentRightButton = (
      <FontAwesomeIcon
        icon={faPlus}
        color={Colors.primary}
        size="2x"
      />
    );

    return (
      <React.Fragment>
        <HeaderBackButton
          title={title}
          ComponentRightButton={ComponentRightButton}
          onRightMenuClick={this._onRightMenuClick}
        />
        <FlatList
          data={archivesData}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={this.getFooterComponent()}
          refreshing={data.networkStatus === 4}
          onRefresh={() => data.refetch()}
          onEndReachedThreshold={1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > -10) {
              this.props.onLoadMore && this.props.onLoadMore();
            }
          }}
          renderItem={({ item }) => (
            <TeacherMyArchiveView {...item} isTeacher />
          )}
        />
        <FooterMenu
          isTeacher
          props={props}
        />
      </React.Fragment>
    );
  }
}

export default MyArchiveListView;
