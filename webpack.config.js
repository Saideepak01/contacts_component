const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ESLintPlugin = require('eslint-webpack-plugin');
// const PrettierPlugin = require('prettier-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      compressionOptions: { level: 9 },
    }),
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx'],
    //   emitError: true,
    //   failOnError: true,
    //   cache: true,
    //   cacheLocation: '.eslintcache',
    //   threads: true,
    //   formatter: 'stylish',
    // }),
    // new PrettierPlugin(),
  ],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "svgo-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: false, // Remove console.* statements
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
