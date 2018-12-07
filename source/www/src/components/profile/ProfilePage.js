// @flow

import React from 'react';
import { Page, PageConsumer } from '../common/Page';
import ProfileView from './ProfileView';

type Props = {};

const ProfilePage = (props: Props) =>
(
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading }) => (
        <ProfileView
          user={currentUser}
          isStudent={currentUser.isStudent}
          isTeacher={currentUser.isTeacher}
        />
      )}
    </PageConsumer>
  </Page>
);

export default ProfilePage;
