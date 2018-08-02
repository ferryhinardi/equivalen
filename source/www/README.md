This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Ref: https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
## Ref: https://medium.freecodecamp.org/quick-painless-automatic-updates-in-electron-d993d5408b3a
## Ref: https://medium.com/bucharestjs/upgrading-a-create-react-app-project-to-a-ssr-code-splitting-setup-9da57df2040a
## Ref: https://gist.github.com/Slauta/5b2bcf9fa1f6f6a9443aa6b447bcae05

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
    - win
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
  script:
    - sed -i -e 's/https:\/\/gitlab.com\/civx/ssh+git:\/\/git@gitlab.com:civx/g' package.json
    - CI=false yarn build && CI=false yarn electron-pack:mac
  only:
    - master
  tags:
    - docker
    - mac
```
