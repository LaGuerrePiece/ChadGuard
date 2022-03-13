const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "/src"),
  dist: path.join(__dirname, "/dist"),
};

module.exports = {
  entry: {
    content: `${PATHS.src}/content.ts`,
    background: `${PATHS.src}/background.ts`,
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(eot|png|svg|[ot]tf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: `${PATHS.src}/manifest.json`, to: PATHS.dist }],
    }),
  ],
};
