#!/usr/bin/env bash

node -v

#run:
    #name: Checking Node Version
    #command: node -v

#run:
    #name: Install lerna
    #command: yarn

#run:
    #name: Install package
    #command: node_modules/lerna/bin/lerna.js bootstrap

#run:
    #name: Build package rp-electron-storage
    #command: node_modules/lerna/bin/lerna.js run build --scope equivalen-redux-persist-electron-storage

#run:
    #name: Build package simple-radio-button
    #command: node_modules/lerna/bin/lerna.js run build --scope equivalen-simple-radio-button

#run:
    #name: Build
    #command: CI=false node_modules/lerna/bin/lerna.js run build --scope exmedia

#run:
    #name: Test
    #command: node_modules/lerna/bin/lerna.js run test:flow --scope exmedia

#run:
    #name: Publish Github
    #command: node_modules/lerna/bin/lerna.js run publish:linux --scope exmedia
    #no_output_timeout: 15m