'use strict';

var gulp = require('gulp');

/*var gstylus = through('gstylus', function (file, config) {
  var that = this;
  var style = stylus(String(file.contents))
    .use(nib())
    .use(jeet())
    .set('filename', file.path)
  ;

  if (!prod) {
    style.set('sourcemap', {inline: true});
  }

  style.render(function (err, result) {
    if (err) {
      return that.emit('error', new gutil.PluginError('stylus', err));
    }

    file.contents = new Buffer(result);
    file.path     = gutil.replaceExtension(file.path, '.css');
  });
});*/



gulp.task('html', function() {

  //var changed = require('gulp-changed');
  var swig = require('gulp-swig');

  var typogr = require('gulp-typogr');

  ///typogr('<h1>"Pretty header ...</h1>').chain().initQuotes().value();
  //'<h1><span class="dquo">"</span>Pretty header ...</h1>'

  //console.log(typogr('<h1>"Pretty header\'s ... bob test</h1>').chain().smartypants().widont().value());

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
    .pipe(gulp.dest(paths.dest));

});
