'use strict'

var gulp = require('gulp')

gulp.task('clean', function () {
  var del = require('del')

  var paths = {
    dist: 'dist'
  }

  del(paths.dist)
})
