'use strict';

// dependencies
var gulp = require('gulp');

// load specific tasks
require('require-dir')('tasks');

// default task
gulp.task('default', [
  'html'
]);
