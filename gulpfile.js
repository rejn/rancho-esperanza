'use strict'

// dependencies
var gulp = require('gulp')

// load specific tasks
require('require-dir')('tasks')

// default task
gulp.task('default', [
  'html',
  'raw',
  'scripts',
  'styles'
])

// lint task
gulp.task('lint', [
  'html:lint',
  'scripts:lint',
  'styles:lint'
])
