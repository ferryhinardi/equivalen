// @flow

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import DatePicker from './DatePicker';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  fields?: Array<{
    key: string,
    value?: string,
    text?: string,
    to?: string,
    disabled?: boolean,
    placeholder?: string,
    type: 'text' | 'email' | 'link' | 'button' | 'submit' | 'password' | 'caption' | 'number',
    align?: 'left' | 'center' | 'right',
    style?: Object,
    textStyle?: Object | Array<any>,
    onClick?: (data: Object) => void,
  }>,
  history: History,
  onSubmit?: (data: Object) => void,
};

type State = {
  isShowPassword: boolean,
  form: {
    [key: string]: any,
  },
};

const styles: Object = {
  form: {
    width: '100%',
  },
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
const BLACKLIST_TYPE_IN_STATE_FORM = ['button', 'link', 'submit'];

class FormEngine extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const form = {};
    (props.fields || []).forEach(field => {
      if (BLACKLIST_TYPE_IN_STATE_FORM.indexOf(field.type) === -1) {
        form[field.key] = field.value || '';
      }
    });

    this.state = {
      isShowPassword: false,
      form,
    };
  }

  componentDidMount() {
    if (document && document.body && document.body.addEventListener) {
      document.body.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          this.props.onSubmit && this.props.onSubmit(this.state.form);
        }
      })
    }
  }

  _createDatePicker = (field) => (
    <DatePicker
      name={field.key}
      minDate={field.minDate}
      maxDate={field.maxDate}
      disabled={field.disabled}
      required={field.required}
      placeholder={field.placeholder}
      onChange={(value) => {
        const returnStateForm = {
          ...this.state.form,
          [field.key]: value,
        };

        this.setState({ form: returnStateForm });
      }}
    />
  );

  _createButtonField = (field) => {
    const isLinkButton = !!field.to;
    const style = Object.assign({}, field.style, styles.button);

    const onClick = () => {
      field.onClick && field.onClick(this.state.form);

      if (isLinkButton) {
        this.props.history.push(field.to);
      }
    };
    const onPress = field.type === 'submit' ? (
      () => this.props.onSubmit && this.props.onSubmit(this.state.form)
    ) : onClick;

    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}>
        <Text style={field.textStyle}>{field.text}</Text>
      </TouchableOpacity>
    );
  }

  _createLinkField = (field) => (
    <Link to={field.to} style={field.style}>{field.text}</Link>
  );

  _createCaptionField = (field) => (<Text style={field.style}>{field.text}</Text>);

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

    const style = field.disabled ? {
      ...styles.formContainer,
      backgroundColor: 'rgba(128, 128, 128, 0.5)',
    } : styles.formContainer;
    const styleTextInput = field.disabled ? {
      ...styles.formInput,
      cursor: 'not-allowed',
    } : styles.formInput;

    return (
      <View style={style}>
        <TextInput
          placeholder={field.placeholder}
          value={this.state.form[field.key]}
          editable={field.disabled}
          style={styleTextInput}
          secureTextEntry={isPasswordType && !this.state.isShowPassword}
          keyboardType={_keyboardType}
          onChangeText={text => {
            const returnStateForm = {
              ...this.state.form,
              [field.key]: text,
            };

            this.setState({ form: returnStateForm });
          }}
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
    case 'submit':
    case 'button':
      input = this._createButtonField(field);
      break;
    case 'caption':
      input = this._createCaptionField(field);
      break;
    case 'date-picker':
      input = this._createDatePicker(field);
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
      <View style={styles.form}>
        {formFields}
      </View>
    );
  }
}

export default FormEngine;
