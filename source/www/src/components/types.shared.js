// @flow

export type History = {
  action: string,
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
    state?: string,
  },
  listen: (listener: any) => void,
  push: (path: string, state: string) => void,
  replace: (path: string, state: string) => void,
};
