'use strict';

var gulp = require('gulp');

gulp.task('styles', function() {

  var args = require('yargs').argv;
  var gulpIf = require('gulp-if');
  var minifyCSS = require('gulp-minify-css');
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  var paths = {
    src: 'src/assets/styles/*.css',
    dest: 'dist/assets/styles'
  };

  var isProduction = args.type === 'production';

  var processors = [
    require('postcss-import')({
      path: [
        'src/assets/styles',
        'node_modules'
      ]
    }),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('postcss-color-function')(),
    require('postcss-color-gray')(),
    require('postcss-calc')(),
    require('autoprefixer-core')({
      browsers: ['last 2 version'],
      cascade: false
    })
  ];

  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(sourcemaps.write())
    .pipe(gulpIf(isProduction, minifyCSS()))
    .pipe(gulp.dest(paths.dest));

});
