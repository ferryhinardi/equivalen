// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-dom';
import { Form, Field } from '@traveloka/react-schema-form';
import { required } from '@traveloka/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Select, DatePicker } from '../form';
import { Loading, Text } from '../common';
import Colors from '../../utils/colors';
import type { History } from '../types.shared';

type Props = {
  loading?: boolean,
  error?: any,
  fields?: Array<{
    key: string,
    type: 'text' | 'email' | 'link' | 'button' | 'submit' | 'password' | 'caption' | 'number' | 'datepicker' | 'select',
    value?: string,
    defaultValue?: string,
    text?: string,
    to?: string,
    query?: string,
    fieldMap?: { value: string, label: string },
    disabled?: boolean,
    required?: boolean,
    placeholder?: string,
    minDate?: Date,
    maxDate?: Date,
    options?: Array<any>,
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
  errorText: {
    textAlign: 'center',
    color: Colors.red,
  },
};

class FormEngine extends Component<Props, State> {
  state = {
    isShowPassword: false,
  };

  componentDidMount() {
    if (document && document.body && document.body.addEventListener) {
      document.body.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          this._onSubmit();
        }
      })
    }
  }

  form: any = null;

  _onSubmit = () => {
    const data = (this.form.getValues && this.form.getValues()) || {};
    this.props.onSubmit && this.props.onSubmit(data);
  };

  _createSelect = (field) => (
    <Field
      name={field.key}
      component={Select}
      placeholder={field.placeholder}
      query={field.query}
      fieldMap={field.fieldMap}
      options={field.options}
      rules={[required]}
    />
  );

  _createDatePicker = (field) => (
    <Field
      name={field.key}
      component={DatePicker}
      placeholder={field.placeholder}
      minDate={field.minDate}
      maxDate={field.maxDate}
      disabled={field.disabled}
      rules={[required]}
    />
  );

  _createButtonField = (field) => {
    const isLinkButton = !!field.to;
    const style = Object.assign({}, field.style, styles.button);

    const onClick = () => {
      const data = (this.form.getValues && this.form.getValues()) || {};
      field.onClick && field.onClick(data);

      if (isLinkButton) {
        this.props.history.push(field.to);
      }
    };
    const onPress = field.type === 'submit' ? (
      () => this._onSubmit()
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
        <Field
          name={field.key}
          component={TextInput}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
          editable={field.disabled}
          secureTextEntry={isPasswordType && !this.state.isShowPassword}
          isPasswordType={isPasswordType}
          keyboardType={_keyboardType}
          style={styleTextInput}
          rules={[required]}
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
    let customStyle = null;

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
    case 'datepicker':
      input = this._createDatePicker(field);
      break;
    case 'select':
      input = this._createSelect(field);
      customStyle = { zIndex: 1 };
      break;
    default:
      input = this._createInputField(field);
      break;
    }

    return (
      <View
        key={field.key}
        align={field.align}
        style={[styles.formGroup, customStyle]}>
        {input}
      </View>
    );
  }

  render() {
    const formFields = (this.props.fields || []).map(field => this._createField(field));

    return (
      <View style={styles.form}>
        {this.props.loading && <Loading transparent />}
        <Form fieldRef={(el) => this.form = el}>
          {formFields}
        </Form>
        {this.props.error && <Text style={styles.errorText}>{this.props.error.message}</Text>}
      </View>
    );
  }
}

export default FormEngine;
