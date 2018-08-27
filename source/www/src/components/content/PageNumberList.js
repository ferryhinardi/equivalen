// @flow
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {RouterContextConsumer} from '../context/router.context';
import {ButtonHoverContextProvider} from '../context/buttonhover.context';
import Colors from '../../utils/colors';
import type {ParamAnswer} from '../types.shared';

const styles = {
  container: {
    position: 'absolute',
    right: 0,
    margin: -16,
    paddingLeft: 2,
    backgroundColor: Colors.white,
  },
  collapseButton: {
    position: 'absolute',
    right: 90,
    top: '50%',
    padding: 8,
    backgroundColor: '#DCECE7',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  collapseIcon: {
  },
  flatList: {
    borderLeftColor: Colors.white,
    borderLeftWidth: 1,
  },
  columnWrapper: {
    borderWidth: 1,
    borderColor: Colors.mainBackground,
  },
  wrapperNumber: {
    flexDirection: 'row',
    width: 50,
    padding: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftColor: '#1EA684',
    borderRightColor: '#1EA684',
    borderBottomColor: '#1EA684',
    backgroundColor: '#DCECE7',
  },
  focusWrapperNumber: {
    borderWidth: 1,
    borderColor: Colors.mainBackground,
  },
  containerHeader: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.white,
    backgroundColor: Colors.mainBackground,
  },
  headerText: {color: Colors.white, textAlign: 'center', paddingVertical: 5, fontSize: 16},
  text: {color: Colors.black, fontSize: 12},
};

class PageNumber extends Component<ParamAnswer> {
  onPageNumberClick = (history, no) => {
    const page = parseInt(no, 10);
    history.transitionTo('/main', {page});
  };

  render() {
    const {no, answer} = this.props;
    return (
      <RouterContextConsumer>
        {({history}) => {
          const {page} = history.getCurrentState();
          const isSelected = parseInt(no, 10) === page;
          const style = isSelected ? {...styles.wrapperNumber, backgroundColor: Colors.mainBackground} : styles.wrapperNumber;
          const styleText = isSelected ? {...styles.text, color: Colors.white} : styles.text;

          return (
            <ButtonHoverContextProvider
              onPress={() => this.onPageNumberClick(history, no)}
              focusStyle={{}}
              style={style}>
              <Text style={styleText}>{`${no}. ${answer}`}</Text>
            </ButtonHoverContextProvider>
          )
        }}
      </RouterContextConsumer>
    );
  }
}

const CollapseButton = ({onCollapse, showPageNumber}: {onCollapse: () => void, showPageNumber: boolean}) => {
  const styleButtonCollapse = showPageNumber ? {right: 90} : {right: -16};
  const icon = showPageNumber ? faAngleDoubleRight : faAngleDoubleLeft;

  return (
    <TouchableOpacity activeOpacity={1} style={[styles.collapseButton, styleButtonCollapse]} onPress={onCollapse}>
      <FontAwesomeIcon icon={icon} color="#74BfA9" size="3x" style={styles.collapseIcon} />
    </TouchableOpacity>
  );
};

type Props = {
  data: Array<ParamAnswer>
};
type State = {showPageNumber: boolean};
class PageNumberList extends Component<Props, State> {
  state = {
    showPageNumber: true,
  };

  _onToggle = () => {
    this.setState({showPageNumber: !this.state.showPageNumber});
  };

  render() {
    const styleContainer = this.state.showPageNumber ? {right: 0} : {right: -110};

    return (
      <View>
        <View style={[styles.container, styleContainer]}>
          <View style={styles.containerHeader}>
            <Text style={styles.headerText}>JAWABAN</Text>
          </View>
          <FlatList
            keyExtractor={item => item.no}
            data={this.props.data}
            style={styles.flatList}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({item}: {item: ParamAnswer}) => (
              <PageNumber no={item.no} answer={item.answer}  />
            )}
          />
        </View>
        <CollapseButton onCollapse={this._onToggle} showPageNumber={this.state.showPageNumber} />
      </View>
    );
  }
}

export default PageNumberList;
