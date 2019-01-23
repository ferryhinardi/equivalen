// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ShareArchiveView, { ShareArchiveHeader, ShareArchiveFooter } from './ShareArchiveView';
import { convertArrToObj, convertObjToArr } from '../../utils/convertArray';

type Props = {};

const dataDummy = [
  { id: '1', fullName: 'daud' },
  { id: '2', fullName: 'simon' },
];

class ShareArchiveListView extends Component<Props> {
  state = {
    data: convertArrToObj(dataDummy, 'id'),
  };

  onClickHeaderCheckbox = (checked) => {
    const list = convertObjToArr(this.state.data, 'array');
    const data = list.map(d => ({ ...d, checked }));
    this.setState({ data: convertArrToObj(data, 'id') });
  };

  onClickCheckbox = (id: string) => {
    const { data } = this.state;
    data[id].checked = !data[id].checked;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    return (
      <FlatList
        data={convertObjToArr(data, 'array')}
        keyExtractor={(item, index) => item.id}
        style={{ width: '100%' }}
        ListHeaderComponent={
          <ShareArchiveHeader onClick={this.onClickHeaderCheckbox} />
        }
        ListFooterComponent={
          <ShareArchiveFooter />
        }
        renderItem={({ item }) => (
          <ShareArchiveView
            {...item}
            onClick={() => this.onClickCheckbox(item.id)}
          />
        )}
      />
    );
  }
}

export default ShareArchiveListView;
