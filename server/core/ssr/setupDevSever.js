const path = require('path');
const MFS = require('memory-fs');
const WebpackBar = require('webpackbar')

function addPluginToConfig(config, plugin) {
  if (!Array.isArray(config.plugins)) {
    config.plugins = [];
  }
  config.plugins.push(plugin)
}

module.exports = function setupDevServer(app, callback) {
  let template;
  let bundle;
  let ready;

  const readyPromise = new Promise(resolve => {
    ready = resolve;
  });

  const update = () => {
    if (bundle && template) {
      ready();
      
      try {
        callback({ template, bundle });
      } catch (error) {
        console.log(error)
      }
    }
  };

  const clientConfigFactory = require("./../../../config/webpack.config");
  const clientConfig = clientConfigFactory("development");

  clientConfig.entry = [
    // add default hot middleware client for hmr injection
    'webpack-hot-middleware/client',
    // and remove cra hot client
    ...clientConfig.entry.filter(e => e !== require.resolve('react-dev-utils/webpackHotDevClient'))
  ];

  addPluginToConfig(
    clientConfig,
    new WebpackBar({
      name: 'Client',
      color: 'green',
    }),
  )

  const compiler = require("webpack")(clientConfig);
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
    stats: "none",
    logLevel: "error",
    index: false
  });
  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    heartbeat: 10 * 1000
  })

  compiler.hooks.done.tap("done", stats => {
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));

    if (stats.errors.length) return;

    try {
      template = devMiddleware.fileSystem.readFileSync(
        path.join(clientConfig.output.path, "index.html"),
        "utf-8"
      );
    } catch (e) {
      console.error(e);
    }
    update();
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);

  // watch server bundle
  const serverConfigFactory = require("./../../../config/webpack.config.server");
  const serverConfig = serverConfigFactory("development");

  addPluginToConfig(
    serverConfig,
    new WebpackBar({
      name: 'Server',
      color: 'orange',
    }),
  )

  const mfs = new MFS();
  const serverCompiler = require("webpack")(serverConfig);
  
  serverCompiler.outputFileSystem = mfs;

  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err;
    }
    stats = stats.toJson();

    if (stats.errors.length) return;

    try {
      bundle = mfs.readFileSync(
        path.join(serverConfig.output.path, "server.bundle.js"),
        "utf-8"
      );
    } catch (error) {
      console.error(error)
    }

    update();
  });

  return readyPromise;
};
