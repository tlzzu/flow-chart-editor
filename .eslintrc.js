module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  plugins: ["html", "standard", "promise"],
  rules: {
    semi: ["error", "always"],
    "no-console": "off"
  },
  globals: {
    document: true,
    navigator: true,
    window: true,
    _: true,
    $: true
  }
};