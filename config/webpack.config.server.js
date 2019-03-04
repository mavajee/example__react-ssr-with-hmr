const path = require("path");

const paths = require("./paths");

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    entry: path.resolve(__dirname, "..", "src", "entryServer.js"),

    devtool: isEnvProduction ? "source-map" : "eval-source-map",

    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",

    output: {
      path: paths.appBuild,
      filename: "server.bundle.js",
      libraryTarget: "commonjs2",
      publicPath: "/"
    },

    target: "node",

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          include: [path.resolve(__dirname, "..", "src")],
          options: {
            plugins: ["dynamic-import-node", "react-loadable/babel"]
          }
        }
      ]
    }
  };
};
