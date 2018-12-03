// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import get from 'lodash/get';
import { ButtonHoverContextProvider, ButtonHoverContextConsumer } from '../context/buttonhover.context';
import { Text, ContentGroup } from '../common';
import { ContentInfo } from '../bankSoal/QuestionView';
import type { Question } from '../types.shared';
import Colors from '../../utils/colors';

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
      {({ focused }) => {
        return (
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
        );
      }}
    </ButtonHoverContextConsumer>
  </ButtonHoverContextProvider>
);

export default SummaryArchiveView;
