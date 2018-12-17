// @flow

import React from 'react';
import { Page, PageConsumer } from '../common/Page';
import EditProfileView from './EditProfileView';
import Colors from '../../utils/colors';

type Props = {};

const EditProfilePage = (props: Props) =>
(
  <Page
    isFullWidth
    withContextProvider
    studentBackgroundColor={Colors.grey}
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
