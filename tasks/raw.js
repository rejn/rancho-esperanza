'use strict';

var gulp = require('gulp');

gulp.task('raw', function() {

  var paths = {
    src: [
      'src/.*',
      'src/**/*.*',
      '!src/**/*.html',
      //'!src/assets/images/**/*.*',
      '!src/assets/scripts/**/*.*',
      '!src/assets/styles/**/*.*'
    ],
    dest: 'dist'
  };

  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));

});
