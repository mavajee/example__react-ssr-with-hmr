const fs = require("fs");
const path = require("path");
const { renderToString } = require("react-dom/server");

const TemplateRenderer = require("./TemplateRenderer");

function compile(bundle) {
  var Module = module.constructor;
  var m = new Module();
  m._compile(bundle, "bnudle");
  return m.exports.default();
}

module.exports = function(app) {
  let template;
  let templateRenderer;
  let bundle;
  let readyPromise;

  // temp
  let createApp;

  if (process.env.NODE_ENV === "development") {
    readyPromise = require("./setupDevSever")(app, options => {
      ({ template, bundle } = options);

      readyPromise = compile(bundle).then(ca => (createApp = ca));
      templateRenderer = new TemplateRenderer(template);
    });
  } else {
    template = fs.readFileSync(
      path.resolve(__dirname, "./../../../build/index.html"),
      "utf-8"
    );
    bundle = require("./../../../build/server.bundle.js").default;

    templateRenderer = new TemplateRenderer(template);

    readyPromise = bundle().then(ca => (createApp = ca));
  }

  const renderApp = async (req, res) => {
    const context = {
      status: 200
    };

    const routeMarkup = renderToString(await createApp(req.url, context));

    if (context.url) {
      res.writeHead(302, {
        Location: context.url
      });

      res.end();
    }

    res.status(context.status);
    // console.log('teteet')
    // const html = template.replace(
    //   '<div id="root"></div>',
    //   `<div id="root"><hr>${routeMarkup}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>`
    // );
    // console.log(html)

    const html = templateRenderer
      .addContent(routeMarkup)
      .addState(context.state)
      .render();

    res.send(html);
  };

  const requestHandler = readyPromise
    ? (req, res) => {
        readyPromise.then(() => {
          return renderApp(req, res);
        });
      }
    : renderApp;

  app.get("*", requestHandler);
};
