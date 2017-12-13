const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "js/fce.[chunkhash].min.js",
  },
  module: {
    rules: [{
        enforce: "pre",
        test: /\.(js|html)$/,
        exclude: path.join(__dirname, "node_module"),
        use: [{
          loader: "eslint-loader",
          options: {
            formatter: require("eslint-friendly-formatter")
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: path.join(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015"]
          }
        },
        include: path.join(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "autoprefixer-loader"],
          publicPath: "../"
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "autoprefixer-loader", "less-loader"],
          publicPath: "../"
        })
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          { loader: "file-loader?limit=1024&name=images/[name].[ext]" }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader" }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          { loader: "file-loader?limit=1024&name=fonts/[name].[ext]" }
        ]
      },
      {
        test: /\.handlebars$/,
        use: [
          { loader: "handlebars-loader" }
        ]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "..", "/dist/index.html"),
      template: "./src/index.html",
      inject: "head", //在head中插入js
      chunks: ["index"]
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../static"),
      to: "",
      ignore: [".*"]
    }])
  ]
}