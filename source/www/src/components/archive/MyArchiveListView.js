// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyArchiveView from './MyArchiveView';
import { HeaderBackButton, Divider } from '../common';
import FooterMenu from '../menu/FooterMenu';
import Colors from '../../utils/colors';

type Props = {
  isStudent: boolean,
  isTeacher: boolean,
  user: Object,
  props: Object,
};

const datas = [
  {
    id: 1,
    packageName: 'TUGAS IPA BESAR DAN SATUAN',
    curriculumName: 'K 13',
    totalQuestion: '5 SOAL-PG',
    createdAt: '2018-11-14T00:00:00.000000',
  },
  {
    id: 2,
    packageName: 'ULANGAN IPA 1',
    curriculumName: 'KTSP',
    totalQuestion: '5 SOAL-PG',
    createdAt: '2018-11-14T00:00:00.000000',
  },
];

class MyArchiveListView extends Component<Props> {
  render() {
    const { isStudent, isTeacher, props } = this.props;

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
            // history.transitionTo('/edit-profile', { isStudent, isTeacher });
          }}
        />
        <FlatList
          data={datas}
          keyExtractor={(item, index) => item.id}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => (
            <MyArchiveView {...item} />
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
