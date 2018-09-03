// @flow

import React from 'react';
import ReactSelect from 'react-select';

type Value = string | number;
type Props = {
  name: string,
  options: Array<{label: string, value: string}>,
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

class Select extends React.Component<Props, State> {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption: Value) => {
    this.setState({ selectedOption }, () => this.props.onChange && this.props.onChange(selectedOption));
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <ReactSelect
        {...this.props}
        value={selectedOption}
        onChange={this.handleChange}
        isSearchable
        options={this.props.options || options}
      />
    );
  }
}

export default Select;
