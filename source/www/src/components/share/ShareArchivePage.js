// @flow

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ShareArchiveListView from './ShareArchiveListView';

type Props = {};

const QUERY_GET_DATA = gql`
  query GET_DATA {
    grades {
      id
      name
    }
    classes(grade:{name:"8"}) {
      id
      name
      grade {
        id
        name
      }
    }
  }
`;

class ShareArchivePage extends Component<Props> {
  render() {
    return (
      <ShareArchiveListView />
    );
  }
}

export default ShareArchivePage;
