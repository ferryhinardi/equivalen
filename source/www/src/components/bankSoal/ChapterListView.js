// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ChapterView from './ChapterView';
import { HeaderBackButton, Loading } from '../common';
import Colors from '../../utils/colors';
import type { Curriculum } from '../types.shared';

type Props = {
  curriculumType: Curriculum,
  isArchive?: any,
  loading: boolean,
  data: Array<{
    id: number,
    name: string,
  }>,
};

class ChapterListView extends Component<Props> {
  render() {
    const { curriculumType, isArchive, loading, data } = this.props;

    return (
      <React.Fragment>
        <HeaderBackButton
          title={`KURIKULUM ${curriculumType}`}
          ComponentRightButton={
            <FontAwesomeIcon
              icon={faTimes}
              color={Colors.primary}
              size="2x"
            />
          }
          onRightMenuClick={(history) => {
            history.replace('/main-menu');
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingVertical: 4 }}
            renderItem={({ item }) => (
              <ChapterView
                curriculumType={curriculumType}
                isArchive={isArchive}
                {...item}
              />
            )}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ChapterListView;
