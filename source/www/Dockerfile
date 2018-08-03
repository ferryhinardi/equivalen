FROM electronuserland/electron-builder:wine

RUN \
  node -v && \
  npm -v && \
  yarn --version && \
  yarn && \
  yarn build && \
  yarn dist
