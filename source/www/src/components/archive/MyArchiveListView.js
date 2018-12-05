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
  render() {
    const { data, isStudent, isTeacher, loading, props } = this.props;
    const archivesData = get(data, 'archives');

    return (
      <React.Fragment>
        <HeaderBackButton
          title="ARSIP SAYA"
          ComponentRightButton={
            <FontAwesomeIcon
              icon={faPlus}
              color={Colors.primary}
              size="2x"
            />
          }
          onRightMenuClick={(history) => {
            history.transitionTo('/archive-input');
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={archivesData}
            keyExtractor={(item, index) => item.id}
            refreshing={data.networkStatus === 4}
            onRefresh={() => data.refetch()}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingVertical: 4 }}
            ItemSeparatorComponent={Divider}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              this.props.onLoadMore && this.props.onLoadMore();
            }}
            renderItem={({ item }) => (
              <MyArchiveView {...item} isTeacher={isTeacher} />
            )}
          />
        )}
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
