// @flow

import React from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import Colors from '../../utils/colors';

type Value = string | number;
type Props = {
  api?: string,
  name: string,
  options: Array<{
    label: string,
    value: string,
  }>,
  onChange?: (value: Value) => void,
};
type State = {
  selectedOption: ?any,
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const styles = {
  option: (base, state) => ({
    ...base,
    borderBottom: `1px solid ${Colors.primary}`,
    color: state.isFocused ? Colors.white : Colors.primary,
    padding: 20,
    backgroundColor: state.isFocused ? Colors.primary : Colors.white,
    cursor: 'pointer',
  }),
  control: (base, state) => ({
    ...base,
    borderColor: Colors.primary,
    backgroundColor: Colors.transparent,
    boxShadow: null,
    '&:hover': {
      borderColor: Colors.primary,
    },
  }),
  input: (base, state) => ({
    ...base,
    borderColor: Colors.primary,
    backgroundColor: Colors.transparent,
  }),
};

class Select extends React.Component<Props, State> {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption: Value) => {
    this.setState(
      { selectedOption },
      () => this.props.onChange && this.props.onChange(selectedOption)
    );
  };

  render() {
    const { api, options: optionsProp, ...props } = this.props;
    const { selectedOption } = this.state;

    return this.props.api ? (
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={new Promise(resolve => resolve())}
      />
    ) : (
      <ReactSelect
        {...props}
        value={selectedOption}
        onChange={this.handleChange}
        isSearchable
        options={optionsProp || options}
        styles={styles}
      />
    );
  }
}

export default Select;
