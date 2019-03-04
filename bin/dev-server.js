'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});


// Ensure environment variables are read.
require('../config/env');

// require('@babel/polyfill');
// require('@babel/register')({
//   babelrc: false,
//   configFile: false,
//   ignore: [/\/(build|node_modules)\//],
//   presets: [['@babel/preset-env', {
//     // configPath: 'babel.config.1.js',
//   }], '@babel/preset-react'],
//   plugins: [
//     '@babel/plugin-syntax-dynamic-import',
//     'dynamic-import-node',
//     // 'react-loadable/babel'
//   ]
// });

require('./../server/index');
