// @flow

import React, { Component } from 'react';
import { HeaderBackButton } from '../common';
import ProfileStudent from './ProfileStudent';
import ProfileTeacher from './ProfileTeacher';
import type { StringBoolean } from '../types.shared';

type Props = { isStudent: StringBoolean, isTeacher: StringBoolean, user: Object };

class ProfileView extends Component<Props> {
  render() {
    const { isStudent, isTeacher, user } = this.props;
    let Content = null;

    if (isStudent === 'true') {
      Content = <ProfileStudent user={user} />
    } else if (isTeacher === 'true') {
      Content = <ProfileTeacher user={user} />
    }

    return (
      <React.Fragment>
        <HeaderBackButton
          rightMenuText="UBAH PROFILE"
          onRightMenuClick={(history) => {
            history.transitionTo('/edit-profile', { isStudent, isTeacher });
          }}
        />
        {Content}
      </React.Fragment>
    );
  }
}

export default ProfileView;
