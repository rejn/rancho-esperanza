'use strict'

var gulp = require('gulp')

gulp.task('scripts', function () {
  var args = require('yargs').argv
  var babel = require('gulp-babel')
  var gulpIf = require('gulp-if')
  var sourcemaps = require('gulp-sourcemaps')
  var uglify = require('gulp-uglify')

  var paths = {
    src: 'src/assets/scripts/*.js',
    dest: 'dist/assets/scripts'
  }

  var isProduction = args.type === 'production'

  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      "presets": [["env", {
        "targets": {
          "browsers": ["last 2 versions"]
        }
      }]]
    }))
    .on('error', function (err) {
      console.log(err.message)
      this.emit('end')
    })
    .pipe(gulpIf(isProduction, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest))
})
