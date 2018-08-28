/* eslint-disable */
/* flow-disable */

const getQueries = (url) => {
  url = url.split('?')[1];
  const queries = require('querystring').parse(url);
  return queries;
};

(function() {
  const indicatorContainerEl = document.createElement('div');
  indicatorContainerEl.setAttribute('class', 'indicator');
  indicatorContainerEl.setAttribute('style', 'display: flex;justify-content: center;z-index: 100;');
  const indicatorEl = document.createElement('img');
  indicatorEl.setAttribute('src', 'loading.gif');
  indicatorEl.setAttribute('class', 'loading');
  indicatorEl.setAttribute('width', '100px');
  indicatorEl.setAttribute('height', '100px');
  indicatorContainerEl.appendChild(indicatorEl);
  document.body.appendChild(indicatorContainerEl);

  const webview = document.querySelector('webview')
  const indicator = document.querySelector('.indicator')
  const loading = document.querySelector('.loading')

  const loadstart = () => {
    document.body.style.background = '#E8E8E8';
    loading.style = 'display: block';
  }

  const loadstop = () => {
    document.body.style.background = 'unset';
    loading.style = 'display: none';
  }

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)
  webview.addEventListener('dom-ready', () => {
    webview.style = `height: ${window.innerHeight}px`;
  })
  webview.addEventListener('will-navigate', ({ url }) => {
    if (url.indexOf('?') > -1) {
      const queries = getQueries(url);
      const event = new CustomEvent("AccountKit", {
        detail: { queries },
      });

      document.dispatchEvent(event);
    }

    webview.stop();
    webview.getWebContents().stop();
  })
})()
