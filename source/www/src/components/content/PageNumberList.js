// @flow
import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {RouterContextConsumer} from '../context/router.context';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import type {ParamAnswer} from '../types.shared';

const styles = {
  container: {flex: 1},
  flatList: {position: 'fixed', right: 20, height: '70%'},
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
    const {no, answer} = this.props;
    return (
      <RouterContextConsumer>
        {({history}) => (
          <ButtonHoverContextProvider
            onPress={() => history.transitionTo('/main', {page: no})}
            style={styles.wrapperNumber}>
            <Text style={styles.text}>{`${no}. ${answer}`}</Text>
          </ButtonHoverContextProvider>
        )}
      </RouterContextConsumer>
    );
  }
}

type Props = {
  data: Array<ParamAnswer>
};
class PageNumberList extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.no}
          data={this.props.data}
          style={styles.flatList}
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
