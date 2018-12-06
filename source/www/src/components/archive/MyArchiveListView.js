// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import get from 'lodash/get';
import MyArchiveView from './MyArchiveView';
import { HeaderBackButton, Divider, Loading } from '../common';
import FooterMenu from '../menu/FooterMenu';
import Colors from '../../utils/colors';

type Props = {
  isStudent: boolean,
  isTeacher: boolean,
  loading: boolean,
  data: Object,
  user: Object,
  props: Object,
  onLoadMore?: () => void,
};

class MyArchiveListView extends Component<Props> {
  getFooterComponent = () => this.props.loading ? <Loading /> : null;

  render() {
    const { data, isStudent, isTeacher, props } = this.props;
    const archivesData = get(data, 'archives');
    const ComponentRightButton = isTeacher ? (
      <FontAwesomeIcon
        icon={faPlus}
        color={Colors.primary}
        size="2x"
      />
    ) : null;

    return (
      <React.Fragment>
        <HeaderBackButton
          title="ARSIP SAYA"
          ComponentRightButton={ComponentRightButton}
          onRightMenuClick={(history) => {
            history.transitionTo('/archive-input');
          }}
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
            <MyArchiveView {...item} isTeacher={isTeacher} />
          )}
        />
        <FooterMenu
          isStudent={isStudent}
          isTeacher={isTeacher}
          props={props}
        />
      </React.Fragment>
    );
  }
}

export default MyArchiveListView;
