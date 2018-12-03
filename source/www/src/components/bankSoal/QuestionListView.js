// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { RouterContextConsumer } from '../context/router.context';
import QuestionView from './QuestionView';
import { Text, HeaderBackButton, Loading } from '../common';
import { convertObjToArr } from '../../utils/convertObjToArr';
import Colors from '../../utils/colors';
import type { History, Curriculum, Question } from '../types.shared';

type Props = {
  curriculumType: Curriculum,
  isArchive?: any,
  chapter: string,
  data: Array<Question>,
  loading: boolean,
  createArchiveRule?: Object,
  currentPackage?: number,
  currentChapter?: string,
};

const styles = {
  headerContainer: {
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: Colors.red,
  },
  titleChapter: {
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
};

const mapStateToProps = ({ archive }) => ({
  ...archive,
});

@connect(mapStateToProps)
class QuestionListView extends Component<Props> {
  getHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.titleChapter}>
        {this.props.chapter}
      </Text>
    </View>
  );

  render() {
    const {
      curriculumType,
      data,
      loading,
      createArchiveRule,
      currentPackage = '',
      currentChapter = '',
      isArchive,
    } = this.props;

    return (
      <React.Fragment>
        <RouterContextConsumer>
          {({ history }: { history: History }) => {
            if (!loading) {
              const totalQuestions = get(createArchiveRule, 'totalQuestions');
              const selectedQuestions = get(
                createArchiveRule,
                `packages[${currentPackage}][${currentChapter}]`,
                {}
              );
              const selectedQuestionsData = convertObjToArr(selectedQuestions, 'array');
              const questionOnlySelected = selectedQuestionsData.filter(question => !!question.selected);

              if (questionOnlySelected.length >= totalQuestions && isArchive) {
                history.transitionTo('/archive-summary');
              }
            }
          }}
        </RouterContextConsumer>
        <HeaderBackButton
          title={`KURIKULUM ${curriculumType}`}
          ComponentRightButton={
            <FontAwesomeIcon
              icon={faTimes}
              color={Colors.primary}
              size="2x"
            />
          }
          onRightMenuClick={(history: History) => {
            history.replace('/main-menu');
          }}
        />
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.id}
            ListHeaderComponent={this.getHeaderComponent()}
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingVertical: 4 }}
            renderItem={({ item, index }) => (
              <QuestionView {...item} index={index + 1} isArchive={isArchive} />
            )}
          />
        )}
      </React.Fragment>
    );
  }
}

export default QuestionListView;
