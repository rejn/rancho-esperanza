'use strict';

var gulp = require('gulp');

gulp.task('html', function() {

  var args = require('yargs').argv;
  var gulpIf = require('gulp-if');
  var minifyHTML = require('gulp-minify-html');
  var swig = require('gulp-swig');
  var typogr = require('gulp-typogr');

  var isProduction = args.type === 'production';

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
    .pipe(gulpIf(isProduction, minifyHTML({
      comments: true,
      quotes: true
    })))
    .pipe(gulp.dest(paths.dest));

});
