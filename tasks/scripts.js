'use strict';

var gulp = require('gulp');

gulp.task('scripts', function() {

  var args = require('yargs').argv;
  var gulpIf = require('gulp-if');
  var sourcemaps = require('gulp-sourcemaps');
  var to5 = require('gulp-6to5');
  var uglify = require('gulp-uglify');

  var paths = {
    src: 'src/assets/scripts/*.js',
    dest: 'dist/assets/scripts'
  };

  var isProduction = args.type === 'production';

  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(to5())
    .on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(sourcemaps.write())
    .pipe(gulpIf(isProduction, uglify()))
    .pipe(gulp.dest(paths.dest));

});
