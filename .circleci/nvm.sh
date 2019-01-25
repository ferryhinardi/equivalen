#!/usr/bin/env bash

export NVM_DIR="~/.nvm"

mv .nvmrc .nvmrc.bak \
    && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && mv .nvmrc.bak .nvmrc \
    && nvm install \
    && npm install -g npm
