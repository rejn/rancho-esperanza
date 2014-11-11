'use strict';

var gulp = require('gulp');

gulp.task('scripts:lint', function() {

  var cached = require('gulp-cached');
  var jscs = require('gulp-jscs');
  var jshint = require('gulp-jshint');

  var paths = {
    src: [
      'gulpfile.js',
      'tasks/*.js',
      'src/assets/scripts/**/*.js'
    ]
  };

  return gulp.src(paths.src)
    .pipe(cached('scripts'))
    .pipe(jscs())
    .on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});
