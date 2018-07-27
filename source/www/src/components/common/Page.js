// @flow

import React, {Component} from 'react';

type Props = {
  children: React$Node,
  backgroundColor?: string,
};

const styles = {
  body: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    maxWidth: '48rem',
    margin: '0 auto',
    textAlign: 'center',
  },
};

class Page extends Component<Props> {
  render() {
    const {children, backgroundColor} = this.props;
    const style = Object.assign({}, styles.body, {backgroundColor});
    return (
      <div style={style}>
        <div style={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

export default Page;
