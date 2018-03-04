const baseWebpackConfig = require("./webpack.base.config.js");
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

module.exports = merge(baseWebpackConfig, {
  devServer: {
    port: 9110,
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    compress: true,
    host: "localhost"
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: '"dev"'
        }
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery", // jquery
      jQuery: "jquery",
      "window.jQuery": "jquery",
      _: "lodash" // lodash
    })
  ]
});