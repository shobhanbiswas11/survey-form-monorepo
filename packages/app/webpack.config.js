const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = (_env, { mode }) => {
  const devMode = mode !== "production";
  return {
    entry: {
      bundle: path.resolve(__dirname, "./src/index.tsx"),
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js",
      publicPath: devMode
        ? "/"
        : "https://shobhanbiswas11.github.io/survey-form-monorepo/",
    },

    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /tsx$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
              plugins: [
                devMode && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        },
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: ["", ".ts", ".tsx", ".js", ".jsx", ".wasm", ".mjs", ".json"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
      }),
      !devMode && new MiniCssExtractPlugin(),
      devMode && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    optimization: { splitChunks: { chunks: "all" } },
  };
};
