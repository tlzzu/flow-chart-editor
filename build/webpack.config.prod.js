const baseWebpackConfig = require("./webpack.base.config.js");

const webpack = require("webpack");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const version = "1.0.0";
baseWebpackConfig.output.filename = "js/fce." + version + ".min.js";
module.exports = merge(baseWebpackConfig, {
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJSPlugin({

    }),
    new webpack.BannerPlugin("flow-chart-editor \nauthor: tlzzu@outlook.com \ncreatetime: " + new Date().toUTCString()) // js中的备注
  ],
})