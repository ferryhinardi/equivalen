// @flow

import React, { Component } from 'react';
import { HeaderBackButton, Text } from '../common';
import EditProfileForm from './EditProfileForm';

type Props = {
  isStudent: boolean,
  isTeacher: boolean,
  user: Object,
};

class EditProfileView extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HeaderBackButton
          ComponentRightButton={
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              SIMPAN & PERBAHARUI
            </Text>
          }
          onRightMenuClick={(history) => {
            history.transitionTo('/profile');
          }}
        />
        <EditProfileForm user={this.props.user} />
      </React.Fragment>
    );
  }
}

export default EditProfileView;
