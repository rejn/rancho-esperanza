'use strict';

var gulp = require('gulp');

gulp.task('html', function() {

  var swig = require('gulp-swig');
  var typogr = require('gulp-typogr');

  var paths = {
    src: 'src/*.html',
    dest: 'dist'
  };

  return gulp.src(paths.src)
    .pipe(swig({
      defaults: {
        cache: false
      }
    }))
    .pipe(typogr({
      only: ['widont', 'smartypants']
    }))
    .pipe(gulp.dest(paths.dest));

});
