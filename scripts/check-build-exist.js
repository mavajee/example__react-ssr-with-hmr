/* eslint global-require: 0 */
(() => {
  const path = require('path');
  const fs = require('fs');

  const getMessage = target => `The ${target} build is not built yet. Build it by running "yarn build"`

  const template = path.join(__dirname, '..', 'build', 'index.html');
  const clientBuild = path.join(__dirname, '..', 'build', 'static');
  const serverBuild = path.join(__dirname, '..', 'build', 'server.bundle.js');

  if (!fs.existsSync(clientBuild) || !fs.existsSync(template)) {
    throw new Error(getMessage('client'));
  }
  if (!fs.existsSync(serverBuild)) {
    throw new Error(getMessage('server'));
  }
})();
