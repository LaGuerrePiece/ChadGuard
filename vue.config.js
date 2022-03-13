const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      content: `./src/content.ts`,
      background: `./src/background.ts`,
    },
    output: {
      path: this.outputDir,
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: `./src/manifest.json`, to: this.outputDir }],
      }),
    ],
  },
});
