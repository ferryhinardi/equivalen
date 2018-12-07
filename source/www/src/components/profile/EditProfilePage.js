// @flow

import React from 'react';
import { Page, PageConsumer } from '../common/Page';
import EditProfileView from './EditProfileView';

type Props = {};

const EditProfilePage = (props: Props) =>
(
  <Page
    isFullWidth
    withContextProvider
    justifyContent="flex-start">
    <PageConsumer>
      {({ currentUser, loading }) => (
        <EditProfileView
          user={currentUser}
          isStudent={currentUser.isStudent}
          isTeacher={currentUser.isTeacher}
        />
      )}
    </PageConsumer>
  </Page>
);

export default EditProfilePage;
