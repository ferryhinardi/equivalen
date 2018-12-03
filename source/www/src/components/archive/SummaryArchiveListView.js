// @flow

import React, { Component } from 'react';
import { SectionList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Text, HeaderBackButton, Loading } from '../common';
import {
  SummaryArchiveHeaderSection,
  SectionSeparator,
  SummaryArchiveView,
} from './SummaryArchiveView';
import Colors from '../../utils/colors';
import { convertObjToArr } from '../../utils/convertObjToArr';

type Props = {
  createArchiveRule?: Object,
  currentPackage?: number,
};
/*
const dummyData = {
  1: {
    'bab 1': {
      2: {
        id: 2,
        index: 1,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      3: {
        id: 3,
        index: 2,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      5: {
        id: 5,
        index: 4,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
    'bab 2': {
      1: {
        id: 1,
        index: 2,
        content: '<p>ABCA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      4: {
        id: 4,
        index: 5,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
    'bab 3': {
      1: {
        id: 1,
        index: 6,
        content: '<p>ABCA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      4: {
        id: 4,
        index: 8,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
  },
  2: {
    'bab 1': {
      6: {
        id: 6,
        index: 1,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      8: {
        id: 8,
        index: 2,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      9: {
        id: 9,
        index: 5,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
    'bab 2': {
      7: {
        id: 7,
        index: 2,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      10: {
        id: 10,
        index: 3,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
  },
  3: {
    'bab 1': {
      11: {
        id: 11,
        index: 2,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      13: {
        id: 13,
        index: 3,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      15: {
        id: 15,
        index: 5,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
    'bab 2': {
      12: {
        id: 12,
        index: 10,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
      14: {
        id: 14,
        index: 15,
        content: '<p>ABCAA</p>',
        answer: 'D',
        selected: true,
        options: [],
      },
    },
  },
};
const currentPackages = 1;
*/
const mapStateToProps = ({ archive }) => ({
  ...archive,
});

@connect(mapStateToProps)
class SummaryArchiveListView extends Component<Props> {
  getFooterComponent = () => {
    let render = null;
    const isLastPackages = true;

    if (isLastPackages) {
      render = (
        <React.Fragment>
          <TouchableOpacity style={{ width: '100%', backgroundColor: Colors.primary, padding: 8, marginVertical: 4 }}>
            <Text style={{ textAlign: 'center', color: Colors.white, fontSize: 16 }}>Simpan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '100%', backgroundColor: Colors.yellow, padding: 8, marginVertical: 4 }}>
            <Text style={{ textAlign: 'center', color: Colors.primary, fontSize: 16 }}>Kembali ke paket sebelumnya</Text>
          </TouchableOpacity>
        </React.Fragment>
      );
    }

    return render;
  };

  render() {
    const {
      createArchiveRule,
      currentPackage,
    } = this.props;
    const selectedQuestions = get(
      createArchiveRule,
      `packages[${currentPackage || 0}]`,
      {}
    );
    // const selectedQuestions = dummyData[currentPackages];
    const data = convertObjToArr(selectedQuestions, 'sectionList',
      (returnValue) => {
        const dataWithoutFiltered = convertObjToArr(
          returnValue.data,
          'array',
        );
        const data = dataWithoutFiltered.filter(d => d.selected)

        return {
          title: returnValue.title,
          data,
        };
      });

    return (
      <React.Fragment>
        <HeaderBackButton />
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingVertical: 4 }}
          renderItem={({item, index, section}) => (
            <SummaryArchiveView {...item} />
          )}
          renderSectionHeader={({section: {title}}) => (
            <SummaryArchiveHeaderSection title={title} />
          )}
          SectionSeparatorComponent={SectionSeparator}
          ListFooterComponent={this.getFooterComponent()}
        />
      </React.Fragment>
    );
  }
}

export default SummaryArchiveListView;
