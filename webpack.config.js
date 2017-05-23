const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WebpackAddModuleExports = require('webpack-add-module-exports');

// Base config
const baseConfig = {
  resolve: {
    extensions: ['.js'],
    alias: {
      modules: path.resolve(__dirname, 'modules'),
      store: path.resolve(__dirname, 'framework/store'),
      connect: path.resolve(__dirname, 'framework/connect'),
    },
  },
};

// Production environment config
const prodConfig = {
  devtool: 'sourcemap',
  // https://github.com/webpack/extract-text-webpack-plugin/issues/35
  stats: { children: false },
  entry: {
    client: './framework/client.js',
  },
  output: {
    publicPath: '/',
    filename: 'static/[name].min.js?[chunkhash]',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'url-loader?limit=8192&name=static/images/[hash].[ext]',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader']),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['node_modules'],
          },
        }],
      }),
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          autoprefixer({ browsers: ['> 0.04%'] });
        },
      },
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env': {
        // This can reduce react lib size and disable some dev feactures like props validation
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('static/[name].min.css?[chunkhash]'),
    new HtmlWebpackPlugin({
      title: 'React Server Render Demo',
      template: 'framework/template.html',
      filename: 'index.html',
      hash: true,
    }),
    new CopyWebpackPlugin([{ from: 'static', to: 'static' }]),
    // Exit with non-zero code when there are any errors
    function () {
      this.plugin('done', function (stats) { // eslint-disable-line
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log(stats.compilation.errors); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ],
};

const serverConfig = {
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  devtool: 'sourcemap',
  // https://github.com/webpack/extract-text-webpack-plugin/issues/35
  stats: { children: false },
  entry: {
    server: './framework/server.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      loader: 'ignored-loader',
    }, {
      test: /\.scss$/,
      loader: 'ignored-loader',
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['build/server.js', 'build/server.js.map']),
    new WebpackAddModuleExports(),
    // Exit with non-zero code when there are any errors
    function () {
      this.plugin('done', function (stats) { // eslint-disable-line
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log(stats.compilation.errors); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ],
};

module.exports = {
  prod: merge(baseConfig, prodConfig),
  server: merge(baseConfig, serverConfig),
};
