const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const config = require('./webpack.config.dev');

const serverConfig = {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false,
  },
};

module.exports = () => {
  return webpackMiddleware(webpack(config), serverConfig);
};
