'use strict';

var gulp = require('gulp');

gulp.task('images', function() {

  var changed = require('gulp-changed');
  var imagemin = require('gulp-imagemin');

  var paths = {
    src: 'src/assets/images/*.{gif,jpg,png,svg}',
    dest: 'dist/assets/images'
  };

  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest(paths.dest));

});
