// @flow

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { FormEngine } from '../form';
import withArchiveFormGroup from './withArchiveFormGroup';
import Colors from '../../utils/colors';

type Props = {};

const QUERY_GET_EVALUATION = gql`
  query getEvaluations {
    evaluations {
      id
      type
    }
  }
`;

const QUERY_GET_QUESTION_TYPE = gql`
  query getQuestionTypes {
    questionTypes {
      id
      name
    }
  }
`;

class InputArchiveForm extends Component<Props> {
  getFieldMap = () => {
    return [
      {
        key: 'name',
        type: 'text',
        label: 'NAMA PAKET',
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'evaluations',
        type: 'select',
        label: 'JENIS EVALUASI',
        query: QUERY_GET_EVALUATION,
        fieldMap: { value: 'id', label: 'type' },
        zIndex: 3,
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'totalPackage',
        type: 'number',
        label: 'JUMLAH PAKET',
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'questionTypes',
        type: 'select',
        label: 'JENIS SOAL',
        query: QUERY_GET_QUESTION_TYPE,
        fieldMap: { value: 'id', label: 'name' },
        zIndex: 2,
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'totalQuestion',
        type: 'number',
        label: 'JUMLAH SOAL',
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'minimumScore',
        type: 'number',
        label: 'NILAI MINIMUM',
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
      {
        key: 'archiveSubmit',
        type: 'submit',
        text: 'PILIH SOAL',
        style: {
          backgroundColor: Colors.primary,
          padding: 16,
          width: '40%',
          alignSelf: 'flex-end',
        },
        textStyle: {
          color: Colors.white,
          fontSize: 16,
          textAlign: 'center',
        },
        component: (element: React$Node, field: Object) =>
          withArchiveFormGroup(element, {
            key: field.key,
            field,
          }),
      },
    ];
  };

  render() {
    return (
      <React.Fragment>
        <FormEngine fields={this.getFieldMap()} />
      </React.Fragment>
    );
  }
}

export default InputArchiveForm;
