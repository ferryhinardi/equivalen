// @flow

export type History = {
  action?: string,
  block: () => void,
  createHref: (location: string) => void,
  go: (n: number) => void,
  goBack: () => void,
  goForward: () => void,
  location: {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state?: any,
  },
  listen: (listener: any) => void,
  push: (path: any, state: any) => void,
  replace: (path: string, state: string) => void,
  queries?: Object,
  transitionTo: (path: string, params?: Object, queries?: Object) => void,
  getCurrentState: () => Object,
};

export type MatPel = 'bhsindo' | 'bhsing' | 'mat' | 'ipa';
export type Answer = 'A' | 'B' | 'C' | 'D';
export type ParamAnswer = { no: number, answer: Answer, isDoubt?: boolean };
export type MappingAnswer = { [no: number]: { answer: Answer, isDoubt?: boolean } };
export type DataQuestion = { [index: number]: { to: number, page: number } };
export type QueriesAccountKit = { code: string, status: 'PARTIALLY_AUTHENTICATED' | 'NOT_AUTHENTICATED' | 'BAD_PARAMS' };
export type LoginType = 'PHONE' | 'EMAIL';
export type UserPickLesson = {
  matpel: MatPel,
  to: number,
  answers: MappingAnswer,
};
