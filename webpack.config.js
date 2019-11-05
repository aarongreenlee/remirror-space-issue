"use strict";

const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
if (!isDevelopment && !isProduction) throw new Error("Unexpected NODE_ENV");

const release = isProduction ? process.env.RELEASE : "development";
if (!release) throw new Error("Unexpected RELEASE");

module.exports = async function() {
  return {
    devtool: isDevelopment ? "eval" : "hidden-source-map",
    entry: {
      main: ["react-hot-loader/patch", "./src/index.tsx"],
    },
    mode: isDevelopment ? "development" : "production",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: [
                  "babel-plugin-transform-react-stateless-component-name",
                  "react-hot-loader/babel"
                ]
              }
            },
            {
              loader: "ts-loader",
              options: {
                compilerOptions: { module: "es2015" },
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.js$/,
          rules: [
            {
              resourceQuery: /build-time/,
              use: "tojson-loader"
            }
          ]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name]-[hash].[ext]"
            }
          }
        }
      ]
    },
    output: {
      filename: "[name].[hash].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/"
    },
    performance: { hints: false },
    plugins: [
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        cwd: process.cwd()
      }),
      new HtmlWebpackPlugin({
        template: "src/index.html"
      }),
      new webpack.DefinePlugin({
        RELEASE: JSON.stringify(release)
      })
    ],
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom"
      },
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin({ extensions: [".ts", ".tsx", ".js"] })]
    },
    stats: isDevelopment ? "minimal" : undefined
  };
};
