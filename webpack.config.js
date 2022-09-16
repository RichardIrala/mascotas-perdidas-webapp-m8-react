const path = require("path");
const liveServer = require("live-server");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const mode = process.env.NODE_ENV;

if (mode === "development") {
  liveServer.start({
    root: "./",
    file: "index.html",
  });
}

module.exports = {
  mode,
  watch: mode == "development" ? true : false,
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        /*opciones*/
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          // "css-loader",
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
