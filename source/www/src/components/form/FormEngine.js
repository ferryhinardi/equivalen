// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-dom';
import { Form, Field } from '@traveloka/react-schema-form';
import { withFormGroup, TextInput, Select, DatePicker } from '../form';
import { Loading, Text } from '../common';
import validation from './validation';
import Colors from '../../utils/colors';
import type { History, Option } from '../types.shared';

type Props = {
  loading?: boolean,
  error?: any,
  fields?: Array<{
    key: string,
    type: 'text' | 'email' | 'link' | 'button' | 'submit' | 'password' | 'caption' | 'number' | 'datepicker' | 'select',
    value?: string | Option,
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
    rules?: Array<string>,
    onClick?: (data: Object) => void,
    onChange?: (selected: Object) => void,
    onInputChange?: (value: string) => string,
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

    if (!this.form.validate()) {
      this.props.onSubmit && this.props.onSubmit(data);
    }
  };

  _createSelect = (field) => (
    <Select
      key={field.key}
      placeholder={field.placeholder}
      query={field.query}
      fieldMap={field.fieldMap}
      options={field.options}
      value={field.value}
      onValueChange={field.onChange}
      onInputChange={field.onInputChange}
    />
  );

  _createDatePicker = (field) => (
    <DatePicker
      key={field.key}
      placeholder={field.placeholder}
      minDate={field.minDate}
      maxDate={field.maxDate}
      disabled={field.disabled}
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

    const style = {
      ...styles.formContainer,
      ...(field.disabled ? { backgroundColor: 'rgba(128, 128, 128, 0.5)' } : {}),
    };
    const styleTextInput ={
      ...styles.formInput,
      ...(field.disabled ? { cursor: 'not-allowed' } : {}),
    };

    return (
      <TextInput
        name={field.key}
        placeholder={field.placeholder}
        defaultValue={field.defaultValue}
        editable={field.disabled}
        isPasswordType={isPasswordType}
        keyboardType={_keyboardType}
        containerStyle={style}
        style={styleTextInput}
      />
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

    const FormGroup = withFormGroup(input, {
      key: field.key,
      align: field.align,
      style: [styles.formGroup, customStyle],
    });

    return (
      <Field
        key={field.key}
        name={field.key}
        component={FormGroup}
        defaultValue={field.defaultValue}
        rules={validation(field.rules)}
      />
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
