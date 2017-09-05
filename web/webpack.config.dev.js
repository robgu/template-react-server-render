const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Base config
module.exports = {
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'sourcemap',
  entry: [
    './web/index.js',
  ],
  output: {
    publicPath: '/',
    filename: 'static/[name].min.js?[hash]',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
        debug: true,
      },
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'React Koa',
      template: 'template.html',
      inject: true,
    }),
  ],
};
