const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const baseManifest = require("./manifest.json");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js"
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      manifest: "manifest.json",
      hash: true
    }),
    new CopyPlugin([
      {
        from: "assets/images",
        to: "icons"
      },
      {
        from: "assets/messages",
        to: "_locales",
      },
      {
        from: "src/background.js",
        to: "",
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    }),
    new CleanWebpackPlugin(),
  ]
};