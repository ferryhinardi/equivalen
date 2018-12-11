// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import get from 'lodash/get';
import
  StudentMyArchiveView,
  { HeaderAssignment }
from './StudentMyArchiveView';
import { HeaderBackButton, Divider, Loading, Image } from '../common';

type Props = {
  evaluation: 'Tugas' | 'Kisi - Kisi' | 'Ujian',
  loading: boolean,
  data: Object,
  user: Object,
  props: Object,
  onLoadMore?: () => void,
};

const EVALUATION_MAP = {
  'Tugas': {
    iconImage: require('../../images/assets/icon-header-tugas.png'),
  },
  'Kisi - Kisi': {
    iconImage: require('../../images/assets/icon-header-tryout.png'),
  },
  'Ujian': {
    iconImage: require('../../images/assets/icon-header-ulangan.png'),
  },
};

class StudentMyArchiveListView extends Component<Props> {
  getHeaderComponent = () => (
    <HeaderAssignment />
  );

  getFooterComponent = () => this.props.loading ? <Loading /> : null;

  render() {
    const { data, evaluation } = this.props;
    const archivesData = get(data, 'archives');
    const ComponentRightButton = (
      <Image source={EVALUATION_MAP[evaluation].iconImage} size={60} />
    );

    return (
      <React.Fragment>
        <HeaderBackButton
          withTriangle
          ComponentRightButton={ComponentRightButton}
        />
        <FlatList
          data={archivesData}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          ItemSeparatorComponent={Divider}
          ListHeaderComponent={this.getHeaderComponent()}
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
            <StudentMyArchiveView {...item} isTeacher={false} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default StudentMyArchiveListView;
