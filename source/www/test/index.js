/* eslint-env node, mocha */
// Ref: https://www.youtube.com/watch?v=OAsoKBFXeGw
// A simple test to verify a visible window is opened with a title
const Application = require('spectron').Application
const path = require('path');
const assert = require('assert')

// construct path
const baseDir = path.join(__dirname, '..');
const electronBinary = path.join(baseDir, 'node_modules', '.bin', 'electron');

// utility function
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('Application Launch', () => {
  const app = new Application({
    path: electronBinary,
    args: [baseDir],
  });

  before(() => app.start());

  after(() => app.stop());

  it('Shows an initial window', async () => {
    await app.client.waitUntilWindowLoaded();
    const count = await app.client.getWindowCount();
    assert.equal(count, 1);
  });
});
