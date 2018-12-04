// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { RouterContextConsumer } from '../context/router.context';
import ChapterView from './ChapterView';
import { HeaderBackButton, Loading } from '../common';
import Colors from '../../utils/colors';
import { convertObjToArr } from '../../utils/convertObjToArr';
import type { Curriculum, History } from '../types.shared';

type Props = {
  curriculum: Curriculum,
  isArchive?: any,
  loading: boolean,
  data: Array<{
    id: number,
    name: string,
  }>,
  createArchiveRule?: Object,
  currentPackage?: number,
};

const mapStateToProps = ({ archive, bankSoal }) => ({
  ...archive,
  ...bankSoal,
});

@connect(mapStateToProps)
class ChapterListView extends Component<Props> {
  render() {
    const {
      curriculum,
      isArchive,
      loading,
      data,
      createArchiveRule,
      currentPackage = 0,
    } = this.props;

    return (
      <React.Fragment>
        <HeaderBackButton
          title={`KURIKULUM ${curriculum}`}
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
                isArchive={isArchive}
                {...item}
              />
            )}
          />
        )}
        <RouterContextConsumer>
          {({ history }: { history: History }) => {
            if (!loading) {
              const totalQuestions = get(createArchiveRule, 'totalQuestions');
              const selectedQuestions = get(
                createArchiveRule,
                `packages[${currentPackage}]`,
                {}
              );
              const selectedQuestionsData = convertObjToArr(
                selectedQuestions,
                'array',
                (returnValue) => convertObjToArr(returnValue, 'array'),
              ).reduce((prev: Array<Object>, curr: Array<Object>) => {
                if (curr.length) {
                  prev = prev.concat(curr);
                }

                return prev;
              }, []);
              const questionOnlySelected = selectedQuestionsData.filter(question => !!question.selected);

              if (questionOnlySelected.length >= totalQuestions && isArchive) {
                history.transitionTo('/archive-summary');
              }
            }
          }}
        </RouterContextConsumer>
      </React.Fragment>
    );
  }
}

export default ChapterListView;
