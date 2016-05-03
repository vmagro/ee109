var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var gulpWebpack = require('gulp-webpack');
var WebpackDevServer = require("webpack-dev-server");
var rimraf = require('rimraf');

var webpackConfig = require('./webpack.config');
var webpackProdConfig = require('./webpack.config.prod');

var scp = require('gulp-scp2');

gulp.task("webpack", ['clean'], function () {
  return gulp.src('app/main.js')
    .pipe(gulpWebpack(webpackProdConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task("webpack-dev-server", ['prepare'], function (callback) {
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    historyApiFallback: true
    // server and middleware options
  }).listen(8080, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});

gulp.task('clean', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('prepare', function () {
  gulp.src('./app/assets/favicon.ico')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compile', ['webpack'], function () {
});

gulp.task('default', ['compile']);
