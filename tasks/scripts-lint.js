'use strict'

var gulp = require('gulp')

gulp.task('scripts:lint', function () {
  var cached = require('gulp-cached')
  var standard = require('gulp-standard')

  var paths = {
    src: [
      'gulpfile.js',
      'tasks/*.js',
      'src/assets/scripts/**/*.js'
    ]
  }

  return gulp.src(paths.src)
    .pipe(cached('scripts'))
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false
    }))
})
