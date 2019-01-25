#!/usr/bin/env bash

export NVM_DIR="/usr/local/nvm"

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install \
    && npm install -g npm
