'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {

  var browserSync = require('browser-sync');

  var paths = {
    dist: 'dist/',
    srcHtml: 'src/**/*.html',
    srcFavicons: 'build/src/*.{ico,png}',
    srcFonts: 'build/src/app/boot/fonts/**/*.woff',
    srcIcons: 'build/src/app/components/icon/*.svg',
    srcImages: 'build/src/app/**/*.{gif,jpg,png,svg}',
    srcStyles: 'build/src/app/**/*.{css,styl}',
    srcScripts: './build/src/index.js',
    srcScriptsLint: [
      'gulpfile.js',
      'tasks/*.js',
      'build/src/app/**/*.js'
    ]
  };

  // start browser sync server (and watch static files)
  browserSync({
    open: 'interal',
    files: 'dist/**/*.*',
    server: {
      baseDir: paths.dist
    }
  });

  // watch src gulp tasks
  gulp.watch(paths.srcHtml, {interval: 500}, ['html']);
  /*gulp.watch(paths.srcFavicons, {interval: 500}, ['favicons']);
  gulp.watch(paths.srcFonts, {interval: 500}, ['fonts']);
  gulp.watch(paths.srcIcons, {interval: 500}, ['icons']);
  //gulp.watch(paths.srcImages, {interval: 500}, ['images']);
  gulp.watch(paths.srcStyles, {interval: 500}, ['styles']);
  gulp.watch(paths.srcScriptsLint, {interval: 500}, ['scripts:lint']);*/

});
