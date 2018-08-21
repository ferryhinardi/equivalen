This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Ref: https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
## Ref: https://medium.freecodecamp.org/quick-painless-automatic-updates-in-electron-d993d5408b3a
## Ref: https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a
## Ref: https://gist.github.com/Slauta/5b2bcf9fa1f6f6a9443aa6b447bcae05
## Ref: https://github.com/avocode/electron-windows-autoupdate
## Ref: https://medium.com/how-to-electron/how-to-add-auto-updates-to-your-electron-application-an-up-to-date-guide-d62794a0467d
## https://productforums.google.com/forum/#!topic/chrome/3j-QURdEywU
## https://daveceddia.com/customize-create-react-app-webpack-without-ejecting/
## https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e
## https://medium.com/@ishwar.rimal/generating-pdf-with-electron-js-31b59ac93249

# deploy docker
```
deploy-win:
  image: electronuserland/electron-builder:wine
  stage: build
  environment: production-win
  cache:
    paths:
      - node_modules/
  before_script:
    - cd source/www
    - node -v
    - npm -v
    - yarn --version
    - yarn
  artifacts:
    paths:
      - $CI_PROJECT_DIR/source/www/dist/*.*
  script:
    - sed -i -e 's/https:\/\/gitlab.com\/civx/ssh+git:\/\/git@gitlab.com:civx/g' package.json
    - CI=false yarn build && CI=false yarn electron-pack:win
  only:
    - master
  tags:
    - docker
```
```
deploy-mac:
  image: electronuserland/electron-builder:wine
  stage: build
  environment: production-mac
  before_script:
    - cd source/www
    - node -v
    - npm -v
    - yarn --version
    - yarn
  artifacts:
    paths:
      - $CI_PROJECT_DIR/source/www/dist/*.*
  script:
    - sed -i -e 's/https:\/\/gitlab.com\/civx/ssh+git:\/\/git@gitlab.com:civx/g' package.json
    - CI=false yarn build && CI=false yarn electron-pack:mac
  only:
    - master
  tags:
    - docker
```
