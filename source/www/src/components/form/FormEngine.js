// @flow

import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import Colors from '../../utils/colors';

type Props = {
  fields?: Array<{
    align?: 'left' | 'center' | 'right',
  }>,
  onSubmit?: () => void,
};

type State = {
  isShowPassword: boolean,
};

const styles = {
  containerIcon: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    cursor: 'pointer',
  },
};

class FormEngine extends Component<Props, State> {
  state = {
    isShowPassword: false,
  };

  _createButtonField = (field) => {
    const isLinkButton = !!field.to;
    const Button = (props: {onClick: SyntheticEvent<HTMLButtonElement>}) => (
      <button
        value={field.value}
        style={field.style}
        onClick={props.onClick || field.onClick}>
        {field.text}
      </button>
    );

    return isLinkButton ? (
      <Route
        render={({history}) => (
          <Button onClick={() => history.push(field.to)} />
        )}
      />
    ) : <Button />;
  }

  _createLinkField = (field) => {
    return (
      <Link to={field.to} style={field.style}>{field.text}</Link>
    );
  }

  _createCaptionField = (field) => {
    return (<span style={field.style}>{field.text}</span>);
  }

  _createInputField = (field) => {
    let type = field.type;
    const isPasswordType = type === 'password';

    if (isPasswordType) {
      type = this.state.isShowPassword ? 'text' : 'password';
    }

    return (
      <div className="form-container">
        <input
          type={type}
          className="form-input"
          placeholder={field.placeholder}
          value={field.value}
        />
        {isPasswordType && (
          <span
            style={styles.containerIcon}
            onMouseDown={() => this.setState({isShowPassword: true})}
            onMouseUp={() => this.setState({isShowPassword: false})}>
            <FontAwesomeIcon icon={faEye} color={Colors.primary} />
          </span>
        )}
      </div>
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
      <div key={field.key} align={field.align} className="form-group">{input}</div>
    );
  }

  render() {
    const formFields = (this.props.fields || []).map(field => this._createField(field));
    return (
      <form onSubmit={this.props.onSubmit}>
        {formFields}
      </form>
    );
  }
}

export default FormEngine;
