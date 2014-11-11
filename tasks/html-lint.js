'use strict';

var gulp = require('gulp');

gulp.task('html:lint', function() {

  var cached = require('gulp-cached');
  var htmlhint = require('gulp-htmlhint');

  var paths = {
    src: 'dist/*.html'
  };

  return gulp.src(paths.src)
    .pipe(cached('html'))
    .pipe(htmlhint())
    .on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(htmlhint.reporter());

});
