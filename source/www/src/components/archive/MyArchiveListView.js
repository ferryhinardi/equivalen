// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyArchiveView from './MyArchiveView';
import { HeaderBackButton, Divider, Loading } from '../common';
import FooterMenu from '../menu/FooterMenu';
import Colors from '../../utils/colors';

type Archive = {
  name: string,
  questionType: {
    name: string,
  },
  createdAt: string,
};

type Props = {
  isStudent: boolean,
  isTeacher: boolean,
  loading: boolean,
  data: Array<Archive>,
  user: Object,
  props: Object,
};

class MyArchiveListView extends Component<Props> {
  render() {
    const { data, isStudent, isTeacher, loading, props } = this.props;

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
            data={data}
            keyExtractor={(item, index) => item.id}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingVertical: 4 }}
            ItemSeparatorComponent={Divider}
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
