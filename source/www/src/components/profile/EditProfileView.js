// @flow

import React, { Component } from 'react';
import { HeaderBackButton } from '../common';
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
          rightMenuText="SIMPAN & PERBAHARUI"
          onRightMenuClick={(history) => {
            // history.transitionTo('/edit-profile', { isStudent, isTeacher });
          }}
        />
        <EditProfileForm user={this.props.user} />
      </React.Fragment>
    );
  }
}

export default EditProfileView;
