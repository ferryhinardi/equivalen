// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import archiveAction from '../../actions/archive';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import { Text, ContentGroup, ButtonRouter } from '../common';
import { ContentInfo } from '../bankSoal/QuestionView';
import type { Question, History, Curriculum } from '../types.shared';
import { convertObjToArr } from '../../utils/convertObjToArr';
import Colors from '../../utils/colors';
import { createOmitTypenameLink } from '../../utils/apolloVariable';

const styles = {
  containerHeaderSection: {
    width: '100%',
    padding: 4,
  },
  titleHeaderSection: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionSeparator: {
    marginVertical: 4,
  },
  containerContentSummary: {
    position: 'relative',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  wrapperOption: {
    paddingHorizontal: 16,
  },
  hoverButtonContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    marginLeft: -8,
    marginTop: -4,
    backgroundColor: 'rgba(154, 154, 154, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoverButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    padding: 8,
  },
  hoverButtonText: {
    fontSize: 16,
  },
};

type PropsHeader = {
  title: string,
};
export const SummaryArchiveHeaderSection = (props: PropsHeader) => (
  <View style={styles.containerHeaderSection}>
    <Text style={styles.titleHeaderSection}>{props.title}</Text>
  </View>
);

export const SectionSeparator = () => (
  <View style={styles.sectionSeparator} />
);

const HoverSectionSummaryView = () => (
  <View style={styles.hoverButtonContainer}>
    <ButtonHoverContextProvider
      style={styles.hoverButton}
      onPress={() => {
        alert('ubah');
      }}>
      <Text style={styles.hoverButtonText}>Ubah</Text>
    </ButtonHoverContextProvider>
  </View>
);

type Props = Question;
export const SummaryArchiveView = (props: Props) => (
  <ButtonHoverContextProvider focusStyle={{ cursor: 'normal' }}>
    <ButtonHoverContextConsumer>
      {({ focused }) => (
        <View style={styles.containerContentSummary}>
          {focused && <HoverSectionSummaryView />}
          <ContentGroup index={props.index} content={props.content} />
          <View style={styles.wrapperOption}>
            {props.options.map(({ option, content }) => (
              <ContentGroup key={option.name} index={option.name} content={content} />
            ))}
          </View>
          <ContentInfo
            answer={props.answer}
            used={props.used}
            creator={get(props.createdBy, 'fullName')}
          />
        </View>
      )}
    </ButtonHoverContextConsumer>
  </ButtonHoverContextProvider>
);

type PropsSummaryFooterArchive = {
  mutate: any,
  createArchiveRule?: Object,
  currentPackage?: number,
  curriculum?: Curriculum,
  archiveActionCreator?: {
    goToNextPackage: () => void,
    goToPrevPackage: () => void,
  },
};

const mapStateToProps = ({ archive, bankSoal }) => ({
  ...archive,
  ...bankSoal,
});
const mapDispatchToProps = dispatch => ({
  archiveActionCreator: bindActionCreators(archiveAction, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export class SummaryArchiveFooterComponent extends Component<PropsSummaryFooterArchive> {
  goNextPackage = (history: History) => {
    this.props.archiveActionCreator &&
      this.props.archiveActionCreator.goToNextPackage();

      history.transitionTo('/chapter');
  };

  goPrevPackage = (history: History) => {
    this.props.archiveActionCreator &&
      this.props.archiveActionCreator.goToPrevPackage();
  };

  onSaveArchive = async (history: History) => {
    const { createArchiveRule, mutate, curriculum } = this.props;
    const packages = get(createArchiveRule, 'packages', {});
    const selectedQuestionsData = convertObjToArr(
      packages,
      'sectionList',
      (returnValue) => {
        const name = get(returnValue, 'title', '-');
        const questions = convertObjToArr(
          get(returnValue, 'data', []),
          'array',
          (returnData) => {
            const questionEachChapter = convertObjToArr(returnData, 'array');

            return questionEachChapter;
          }
        )
        .reduce(
          (prev: Array<Object>, curr: Array<Object>) => {
            if (curr.length) {
              prev = prev.concat(curr);
            }

            return prev;
          }, [])
        .map(qs => {
          const { selected, index, ...props } = qs;
          return props;
        });

        return { name, questions };
      });
    const archiveData = {
      name: get(createArchiveRule, 'name'),
      minimumScore: get(createArchiveRule, 'minimumScore'),
      questionType: {
        id: get(createArchiveRule, 'questionType'),
      },
      evaluation: {
        id: get(createArchiveRule, 'evaluationId'),
      },
      curriculum: {
        name: curriculum,
      },
      packages: selectedQuestionsData,
    };
    const variables = {
      archive: createOmitTypenameLink(archiveData, ['used', 'createdBy']),
    };

    await mutate({ variables });
    history.transitionTo('/archive');
  };

  render() {
    let render = null;
    const { createArchiveRule, currentPackage } = this.props;
    const totalPackages = get(createArchiveRule, 'totalPackages', 0);
    const moreThanOnePackages = totalPackages > 1;
    const isLastPackages = currentPackage >= totalPackages;
    const isPackageOne = currentPackage === 1;
    const nextPackage = currentPackage + 1;

    if (moreThanOnePackages) {
      if (isLastPackages) {
        render = (
          <React.Fragment>
            <ButtonRouter
              style={{ width: '100%', backgroundColor: Colors.primary, padding: 8, marginVertical: 4 }}
              onPress={this.onSaveArchive}>
              <Text
                style={{ textAlign: 'center', color: Colors.white, fontSize: 16 }}>
                Simpan
              </Text>
            </ButtonRouter>
            <ButtonRouter
              style={{ width: '100%', backgroundColor: Colors.yellow, padding: 8, marginVertical: 4 }}
              onPress={this.goPrevPackage}>
              <Text
                style={{ textAlign: 'center', color: Colors.primary, fontSize: 16 }}>
                Kembali ke paket sebelumnya
              </Text>
            </ButtonRouter>
          </React.Fragment>
        );
      } else if (isPackageOne) {
        render = (
          <ButtonRouter
            style={{ width: '100%', backgroundColor: Colors.primary, padding: 8, marginVertical: 4 }}
            onPress={this.goNextPackage}>
            <Text
              style={{ textAlign: 'center', color: Colors.white, fontSize: 16 }}>
              {`Lanjut ke Paket ${nextPackage}`}
            </Text>
          </ButtonRouter>
        );
      } else {
        render = (
          <React.Fragment>
            <ButtonRouter
              style={{ width: '100%', backgroundColor: Colors.primary, padding: 8, marginVertical: 4 }}
              onPress={this.goNextPackage}>
              <Text
                style={{ textAlign: 'center', color: Colors.white, fontSize: 16 }}>
                {`Lanjut ke Paket ${nextPackage}`}
              </Text>
            </ButtonRouter>
            <ButtonRouter
              style={{ width: '100%', backgroundColor: Colors.yellow, padding: 8, marginVertical: 4 }}
              onPress={this.goPrevPackage}>
              <Text
                style={{ textAlign: 'center', color: Colors.primary, fontSize: 16 }}>
                Kembali ke paket sebelumnya
              </Text>
            </ButtonRouter>
          </React.Fragment>
        );
      }
    } else {
      render = (
        <ButtonRouter
          style={{ width: '100%', backgroundColor: Colors.primary, padding: 8, marginVertical: 4 }}
          onPress={this.onSaveArchive}>
          <Text
            style={{ textAlign: 'center', color: Colors.white, fontSize: 16 }}>
            Simpan
          </Text>
        </ButtonRouter>
      );
    }

    return render;
  }
}

type PropsSummaryHeaderArchive = {
  curriculum?: Curriculum,
};
@connect(mapStateToProps)
export class SummaryArchiveHeaderComponent extends Component<PropsSummaryHeaderArchive> {
  render() {
    const { curriculum = '' } = this.props;
    return (
      <View
        style={{
          padding: 8,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderBottomColor: Colors.primary,
        }}>
        <Text style={{ fontSize: 16 }}>{`Kurrikulum: ${curriculum}`}</Text>
      </View>
    );
  }
}
