FROM electronuserland/electron-builder:wine
RUN \
  node -v && \
  npm -v && \
  yarn --version
WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
RUN yarn build && yarn dist
EXPOSE 3000
CMD [ "yarn", "start" ]
