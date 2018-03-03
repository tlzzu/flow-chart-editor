const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
const version = "1.0.0";
module.exports = {
  entry: {
    index: "./src/js/index.js"
  },
  devtool: "eval-source-map", // 'source-map', // http://www.jianshu.com/p/42e11515c10f
  output: {
    filename: "js/fce." + version + ".min.js",
    path: path.join(__dirname, "../dist/")
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: path.join(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015"]
          }
        },
        include: path.join(__dirname, "src")
      },
      {
        // css / sass / scss loader for webpack
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "sass-loader?minimize"]
        })
      },
      {
        test: /\.less$/,
        use: ["css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{ loader: "file-loader?limit=1024&name=fonts/[name].[ext]" }]
      },
      {
        test: /\.handlebars$/,
        use: [{ loader: "handlebars-loader" }]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/fce." + version + ".min.css",
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "..", "/dist/index.html"),
      template: "./src/index.html",
      inject: "head", // 在head中插入js
      chunks: ["index"],
      hash: true
    }),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../static"),
      to: "",
      ignore: [".*"]
    }])
  ]
};