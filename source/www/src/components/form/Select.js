// @flow

import React from 'react';
import R from 'ramda';
import { ApolloConsumer } from 'react-apollo';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import Colors from '../../utils/colors';

type Value = string | number;
type Option = {
  label: string,
  value: string,
};
type Props = {
  query?: string,
  fieldMap?: Option,
  placeholder?: string,
  name: string,
  options?: Array<Option>,
  onChange?: (value: Value) => void,
};
type State = {
  selectedOption: ?any,
};

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

  _loadOptions = (client, query, inputValue, callback) => {
    const { name, fieldMap = {} } = this.props;
    const fieldMapValue = fieldMap.value || '';
    const fieldMapLabel = fieldMap.label || '';

    client.query({ query }).then(({ data }) => {
      const options =
        R.pipe(
          R.propOr([], name),
          R.map(d => ({ value: d[fieldMapValue], label: d[fieldMapLabel], ...d }))
        )(data);

      callback(options);
    });
  };

  render() {
    const { query, placeholder, options } = this.props;
    const { selectedOption } = this.state;

    return query ? (
      <ApolloConsumer>
        {client => (
          <AsyncSelect
            placeholder={placeholder}
            cacheOptions
            defaultOptions
            styles={styles}
            onChange={this.handleChange}
            loadOptions={(inputValue, callback) => this._loadOptions(client, query, inputValue, callback)}
          />
        )}
      </ApolloConsumer>
    ) : (
      <ReactSelect
        placeholder={placeholder}
        value={selectedOption}
        onChange={this.handleChange}
        isSearchable
        options={options}
        styles={styles}
      />
    );
  }
}

export default Select;
