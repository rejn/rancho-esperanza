'use strict';

// dependencies
var gulp = require('gulp');

// load specific tasks
require('require-dir')('tasks');

// default task
gulp.task('default', ['clean'], function (cb) {

  var runSequence = require('run-sequence');

  runSequence([
    'html',
    'images',
    'raw'
  ], cb);

});
