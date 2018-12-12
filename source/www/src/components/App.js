// @flow

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './root';
import {
  TeacherMyArchivePage,
  StudentMyArchivePage,
  InputArchivePage,
  SummaryArchivePage,
  StudentStudyPage,
} from './archive';
import {
  CurriculumPage,
  ChapterPage,
  QuestionPage,
  TeacherTutorialPage,
  StudentTutorialPage,
} from './bankSoal';
import { Info, PageNotFound } from './common';
import { SplashPage, FAQ, MainPage } from './content';
import { PersistorProvider } from './context/persistor.context';
import { MenuPage, TempMenuPage } from './menu';
import { LoginPage, TempLogin, AccountKitPage } from './auth';
import { RegistrationPage, IntroPage } from './registration';
import { ProfilePage, EditProfilePage } from './profile';
import configureStore from '../store';
import apolloClient from '../apolloClient';
import type { History } from './types.shared';

type Props = {
  history: History,
};

class App extends Component<Props> {
  render() {
    const { history } = this.props;
    const { store, persistor } = configureStore();

    return (
      <ApolloProvider client={apolloClient}>
        <PersistorProvider persistor={persistor}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Root path="/" history={history}>
                <Switch>
                  <Route path="/splash" component={SplashPage} />
                  <Route path="/login" component={LoginPage} />
                  {/* Temporary Login Page for Demo */}
                  <Route path="/temp-login" component={TempLogin} />
                  {/* ============================= */}
                  <Route path="/account-kit" component={AccountKitPage} />
                  <Route path="/registration" component={RegistrationPage} />
                  <Route path="/info" component={Info} />
                  <Route path="/intro" component={IntroPage} />
                  <Route path="/main-menu" component={MenuPage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/edit-profile" component={EditProfilePage} />
                  <Route path="/student-study" component={StudentStudyPage} />
                  <Route path="/student-archive" component={StudentMyArchivePage} />
                  <Route path="/teacher-archive" component={TeacherMyArchivePage} />
                  <Route path="/archive-input" component={InputArchivePage} />
                  <Route path="/archive-summary" component={SummaryArchivePage} />
                  <Route path="/curriculum" component={CurriculumPage} />
                  <Route path="/chapter" component={ChapterPage} />
                  <Route path="/question" component={QuestionPage} />
                  <Route path="/teacher-tutorial" component={TeacherTutorialPage} />
                  <Route path="/student-tutorial" component={StudentTutorialPage} />
                  {/* Temporary Menu Page for Demo */}
                  <Route path="/temp-main-menu" component={TempMenuPage} />
                  {/* ============================= */}
                  <Route path="/main" component={MainPage} />
                  <Route path="/faq" component={FAQ} />
                  <Redirect from="/" to="/splash" />
                  <Route path="*" component={PageNotFound} />
                </Switch>
              </Root>
            </PersistGate>
          </Provider>
        </PersistorProvider>
      </ApolloProvider>
    );
  }
}

export default App;
