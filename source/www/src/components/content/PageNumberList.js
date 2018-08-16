// @flow
import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import type {ParamAnswer} from '../types.shared';

const styles = {
  container: {padding: 4},
  wrapperNumber: {
    flexDirection: 'row',
    width: 50,
    padding: 4,
    borderWidth: 2,
    borderColor: Colors.transparent,
  },
  text: {color: Colors.white, fontSize: 16},
};

class PageNumber extends Component<ParamAnswer> {
  render() {
    return (
      <ButtonHoverContextProvider style={styles.wrapperNumber}>
        <Text style={styles.text}>{`${this.props.no}. ${this.props.answer}`}</Text>
      </ButtonHoverContextProvider>
    );
  }
}

type Props = {
  data: Array<ParamAnswer>
};
class PageNumberList extends Component<Props> {
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          numColumns={2}
          columnWrapperStyle={{paddingVertical: 4}}
          renderItem={({item}: {item: ParamAnswer}) => (
            <PageNumber no={item.no} answer={item.answer}  />
          )}
        />
      </View>
    );
  }
}

export default PageNumberList;
