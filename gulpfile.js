const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');

const webConfig = require('./webpack.config');

function startWebpackDevServer(config) {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
    },
  }).listen(8080, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:8080');
  });
}

gulp.task('webpack-dev-server-web', () => {
  startWebpackDevServer(webConfig.dev);
});

gulp.task('dist', () => {
  return gulp.src('./framework/index.js')
    .pipe(webpackStream(webConfig.prod, webpack))
    .pipe(gulp.dest('build'));
});

gulp.task('server', () => {
  return gulp.src('./framework/server.js')
    .pipe(webpackStream(webConfig.server, webpack))
    .pipe(gulp.dest('build/server'));
});
