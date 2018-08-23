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
export type ParamAnswer = {no: number, answer: Answer};
export type MappingAnswer = {[no: number]: Answer};
