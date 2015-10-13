'use strict'

var gulp = require('gulp')

gulp.task('watch', ['default'], function () {
  var browserSync = require('browser-sync')
  var reload = browserSync.reload

  var paths = {
    dist: 'dist',
    distHtml: 'dist/*.html',
    srcHtml: 'src/**/*.html',
    srcImages: 'src/assets/images/**/*.{gif,jpg,png,svg}',
    srcStyles: 'src/assets/styles/**/*.css',
    srcStylesLint: 'src/assets/styles/components/**/*.css',
    srcScripts: 'src/assets/scripts/**/*.js',
    srcScriptsLint: [
      'gulpfile.js',
      'tasks/*.js',
      'src/assets/scripts/**/*.js'
    ]
  }

  // start browser sync server
  browserSync({
    open: 'interal',
    server: {
      baseDir: paths.dist
    }
  })

  // watch src gulp tasks and trigger reload
  gulp.watch(paths.srcHtml, { interval: 500 }, [ 'html', reload ])
  gulp.watch(paths.distHtml, { interval: 500 }, [ 'html:lint' ])
  gulp.watch(paths.srcImages, {interval: 500}, ['images', reload])
  gulp.watch(paths.srcScripts, {interval: 500}, ['scripts', reload])
  gulp.watch(paths.srcScriptsLint, {interval: 500}, ['scripts:lint'])
  gulp.watch(paths.srcStyles, {interval: 500}, ['styles', reload])
  gulp.watch(paths.srcStylesLint, {interval: 500}, ['styles:lint'])
})
