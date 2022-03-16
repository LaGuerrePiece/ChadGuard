const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      path: this.outputDir,
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".ts"],
      fallback: {
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        zlib: require.resolve("browserify-zlib"),
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: `./src/manifest.json`, to: this.outputDir },
          { from: `./src/nsfwjsmin2.js`, to: this.outputDir },
          { from: `./src/defaultBlocklist.json`, to: this.outputDir },
          {
            from: `./src/blockpages`,
            to: path.resolve("dist", "blockpages"),
          },
        ],
      }),
    ],
  },
});
