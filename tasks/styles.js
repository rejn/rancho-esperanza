'use strict'

var gulp = require('gulp')

gulp.task('styles', function () {
  var args = require('yargs').argv
  var gulpIf = require('gulp-if')
  var cssnano = require('gulp-cssnano')
  var postcss = require('gulp-postcss')
  var sourcemaps = require('gulp-sourcemaps')

  var paths = {
    src: 'src/assets/styles/*.css',
    dest: 'dist/assets/styles'
  }

  var isProduction = args.type === 'production'

  var processors = [
    require('postcss-import')(),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('postcss-color-function')(),
    require('postcss-color-gray')(),
    require('postcss-calc')(),
    require('autoprefixer')()
  ]

  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', function (err) {
      console.log(err.message)
      this.emit('end')
    })
    .pipe(gulpIf(isProduction, cssnano({ autoprefixer: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest))
})
