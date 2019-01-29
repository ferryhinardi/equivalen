// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const styles = {
  collapseButton: {
    padding: 8,
    height: 65,
    alignSelf: 'center',
    backgroundColor: '#DCECE7',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    right: 0,
  },
  collapseIcon: {},
};

const CollapseButton = ({
  onCollapse,
  showPageNumber,
}: {
  onCollapse: () => void,
  showPageNumber: boolean,
}) => {
  const icon = showPageNumber ? faAngleDoubleRight : faAngleDoubleLeft;

  return (
    <TouchableOpacity
      activeOpacity={.9}
      style={styles.collapseButton}
      onPress={onCollapse}>
      <FontAwesomeIcon icon={icon} color="#74BfA9" size="3x" style={styles.collapseIcon} />
    </TouchableOpacity>
  );
};

export default CollapseButton;
