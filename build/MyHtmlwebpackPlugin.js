function MyHtmlwebpackPlugin(options) {
  this.options = options;
}

MyHtmlwebpackPlugin.prototype.apply = function(compiler) {
  const js = this.options.paths.js,
    css = this.options.paths.css;
  compiler.plugin("compilation", function(compilation, options) {
    compilation.plugin("html-webpack-plugin-before-html-processing", function(
      htmlPluginData,
      callback
    ) {
      if (css && css.length) {
        for (let i = css.length - 1; i >= 0; i--) {
          htmlPluginData.assets.css.unshift(css[i]);
        }
      }
      if (js && js.length) {
        for (let i = js.length - 1; i >= 0; i--) {
          htmlPluginData.assets.js.unshift(js[i]);
        }
      }
      callback(null, htmlPluginData);
    });
  });
};

module.exports = MyHtmlwebpackPlugin;