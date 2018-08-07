// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/colors';

type Props = {
  fields?: Array<{
    key: string,
    value?: string,
    text?: string,
    to?: string,
    placeholder?: string,
    type: 'text' | 'email' | 'link' | 'button' | 'password' | 'caption' | 'number',
    align?: 'left' | 'center' | 'right',
    style?: Object,
    textStyle?: Object | Array<any>,
    onClick?: (e?: SyntheticEvent<>) => void,
  }>,
};

type State = {
  isShowPassword: boolean,
};

const styles: Object = {
  containerIcon: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  formGroup: {
    marginTop: 8,
    marginBottom: 8,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primary,
  },
  formInput: {
    width: '95%',
    padding: 8,
    fontSize: 16,
    outline: 'none',
  },
};

class FormEngine extends Component<Props, State> {
  static contextTypes = {
    history: PropTypes.object,
  };

  state = {
    isShowPassword: false,
  };

  _createButtonField = (field) => {
    const isLinkButton = !!field.to;
    const style = Object.assign({}, field.style, styles.button);

    const onClick = () => {
      field.onClick && field.onClick();

      if (isLinkButton) {
        this.context.history.push(field.to);
      }
    };

    return (
      <TouchableOpacity
        style={style}
        onPress={onClick}>
        <Text style={field.textStyle}>{field.text}</Text>
      </TouchableOpacity>
    );
  }

  _createLinkField = (field) => {
    return (
      <Link to={field.to} style={field.style}>{field.text}</Link>
    );
  }

  _createCaptionField = (field) => {
    return (<Text style={field.style}>{field.text}</Text>);
  }

  _createInputField = (field) => {
    let type = field.type;
    let _keyboardType = 'default';
    const isPasswordType = type === 'password';

    switch(type) {
    case 'email':
      _keyboardType = 'email-address';
      break;
    case 'number':
      _keyboardType = 'numeric';
      break;
    default:
      _keyboardType = 'default';
      break;
    }

    return (
      <View style={styles.formContainer}>
        <TextInput
          placeholder={field.placeholder}
          value={field.value}
          style={styles.formInput}
          secureTextEntry={isPasswordType && !this.state.isShowPassword}
          keyboardType={_keyboardType}
        />
        {isPasswordType && (
          <TouchableOpacity
            style={styles.containerIcon}
            onPressIn={() => this.setState({isShowPassword: true})}
            onPressOut={() => this.setState({isShowPassword: false})}>
            <FontAwesomeIcon icon={faEye} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  _createField = (field) => {
    let input = null;

    switch (field.type) {
    case 'link':
      input = this._createLinkField(field);
      break;
    case 'button':
      input = this._createButtonField(field);
      break;
    case 'caption':
      input = this._createCaptionField(field);
      break;
    default:
      input = this._createInputField(field);
      break;
    }

    return (
      <View
        key={field.key}
        align={field.align}
        style={styles.formGroup}>
        {input}
      </View>
    );
  }

  render() {
    const formFields = (this.props.fields || []).map(field => this._createField(field));
    return (
      <View>
        {formFields}
      </View>
    );
  }
}

export default FormEngine;
