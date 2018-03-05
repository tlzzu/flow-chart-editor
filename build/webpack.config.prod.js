const baseWebpackConfig = require("./webpack.base.config.js");

const webpack = require("webpack");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MyHtmlwebpackPlugin = require("./MyHtmlwebpackPlugin.js");

//设置排除项
baseWebpackConfig.externals = {
  jquery: "jQuery",
  konva: "konva",
  cytoscape: "cytoscape",
  "cytoscape-node-resize": "nodeResize",
  "cytoscape-grid-guide": "gridGuide",
  "cytoscape-edgehandles": "edgehandles",
  "cytoscape-context-menus": "contextMenus",
  "cytoscape-edge-bend-editing": "edgeBendEditing",
  "cytoscape-undo-redo": "undoRedo",
  "cytoscape-view-utilities": "viewUtilities"
};
module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: '"prod"'
        }
      }
    }),
    //扩展插入外部脚本
    new MyHtmlwebpackPlugin({
      paths: {
        css: ["css/cytoscape-context-menus.css"],
        js: [
          "js/lib/cytoscape.js",
          "js/lib/jquery.js",
          "js/lib/konva.min.js",
          "js/lib/cytoscape-node-resize.js",
          "js/lib/cytoscape-grid-guide.js",
          "js/lib/cytoscape-edgehandles.js",
          "js/lib/cytoscape-context-menus.js",
          "js/lib/cytoscape-edge-bend-editing.js",
          "js/lib/cytoscape-undo-redo.js",
          "js/lib/cytoscape-view-utilities.js"
        ]
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    // new HtmlWebpackPlugin({
    //   filename: path.join(__dirname, "..", "/dist/index.html"),
    //   template: "./src/index.html",
    //   inject: "head", // 在head中插入js
    //   chunks: ["index"]
    // }),
    new webpack.BannerPlugin(
      "flow-chart-editor \nauthor: tlzzu@outlook.com \ncreatetime: " +
      new Date().toUTCString()
    ) // js中的备注
  ]
});