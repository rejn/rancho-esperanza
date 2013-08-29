module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: ['Gruntfile.js'],
      all: [
        'src/assets/scripts/**/*.js',
        '!src/assets/scripts/libs/**/*.js'
      ]
    },
    assemble: {
      options: {
        assets: 'dist/assets',
        flatten: true,
        layout: 'en.hbs',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/partials/**/*.{hbs,md}']
      },
      dev: {
        options: {
          dev: true,
          prod: false
        },
        src: ['src/*.hbs'],
        dest: 'dist/'
      },
      prod: {
        options: {
          dev: false,
          prod: true
        },
        src: ['src/*.hbs'],
        dest: 'dist/'
      }
    },
    clean: {
      dist: ['dist/**']
    },
    copy: {
      options: {
        processContentExclude: ['.DS_Store', '.gitignore', 'node_modules']
      },
      staticFiles: {
        files: [
          {
            cwd: 'src',
            dest: 'dist',
            expand: true,
            filter: 'isFile',
            src: [
              '**',
              '**/.*',
              '!**/*.hbs',
              '!templates/**/*.*',
              '!assets/images/**/*.*',
              '!assets/scripts/**/*.*',
              '!assets/styls/**/*.*'
            ]
          }
        ]
      },
      scripts: {
        files: [
          {
            cwd: 'src/assets/scripts/',
            dest: 'dist/assets/scripts/',
            expand: true,
            filter: 'isFile',
            src: ['**/*.js']
          }
        ]
      },
      images: {
        files: [
          {
            cwd: 'src/assets/images/',
            dest: 'dist/assets/images/',
            expand: true,
            filter: 'isFile',
            src: ['**/*.{png,jpg,svg}']
          }
        ]
      }
    },
    express: {
      options: {
        hostname: '*',
        bases: ['dist']
      },
      dev: {
        options: {
          livereload: true,
          port: 9000
        }
      },
      prod: {
        options: {
          port: 3000
        }
      }
    },
    ftpscript: {
      options: {
        host: 'ftp.richardhallows.com',
        passive: false
      },
      all: {
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: [
              '**',
              '**/.*'
            ],
            dest: '/httpdocs/'
          }
        ]
      },
      withoutAssets: {
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: [
              '**',
              '**/.*',
              '!assets/**'
            ],
            dest: '/httpdocs/'
          }
        ]
      }
    },
    htmlmin: {
      prod: {
        options: {
          collapseWhitespace: true,
          removeComments: true
        },
        files: [
          {
            cwd: 'dist/',
            dest: 'dist/',
            expand: true,
            src: ['**/*.html']
          }
        ]
      }
    },
    imagemin: {
      all: {
        files: [
          {
            cwd: 'src/assets/images/',
            dest: 'src/assets/images/',
            expand: true,
            src: '**/*.{png,jpg}'
          }
        ]
      }
    },
    open: {
      dev: {
        url: 'http://localhost:<%= express.dev.options.port %>'
      },
      prod: {
        url: 'http://localhost:<%= express.prod.options.port %>'
      }
    },
    stylus: {
      dev: {
        options: {
          compress: false
        },
        files: {
          'dist/assets/styles/core.css': 'src/assets/styls/core.styl'
        }
      },
      prod: {
        options: {
          compress: true
        },
        files: {
          'dist/assets/styles/core.css': 'src/assets/styls/core.styl'
        }
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      all: {
        files: [
          {
            cwd: 'src/assets/images/',
            dest: 'src/assets/images/',
            expand: true,
            src: ['**/*.svg']
          }
        ]
      }
    },
    uglify: {
      prod: {
        files: {
          'dist/assets/scripts/core.js': ['src/assets/scripts/core.js']
        }
      }
    },
    watch: {
      assemble: {
        files: ['src/**/*.hbs'],
        tasks: ['assemble']
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      imagesRaster: {
        options: {
          spawn: false
        },
        files: ['src/assets/images/**/*.{jpg,png}'],
        tasks: [
          'imagemin',
          'copy:images'
        ]
      },
      imagesVector: {
        options: {
          spawn: false
        },
        files: ['src/assets/images/**/*.svg'],
        tasks: [
          'svgmin',
          'copy:images'
        ]
      },
      staticFiles: {
        options: {
          spawn: false
        },
        files: [
          'src/**/',
          '!src/**/*.hbs',
          '!src/templates/**/',
          '!src/assets/images/**/',
          '!src/assets/styls/**/' ],
        tasks: [
          'copy:staticFiles',
          'copy:scripts'
        ]
      },
      stylus: {
        files: ['src/assets/styls/**/*.styl'],
        tasks: ['stylus:dev']
      },
    }
  });

  // only perform tasks on changed files
  grunt.event.on( 'watch', function( action, filepath ) {

    var updateFilesArraySrc = function(configKey) {
      grunt.config.set(configKey, grunt.config.get(configKey).map(function(file) {
        file.src = filepath.replace(/\\/g, '/').replace(file.cwd, '');
        return file;
      }));
    };
    if (grunt.file.isMatch(grunt.config('watch.staticFiles.files'), filepath)) {
      updateFilesArraySrc(['copy', 'staticFiles', 'files']);
      updateFilesArraySrc(['copy', 'scripts', 'files']);
    }

    if (grunt.file.isMatch(grunt.config('watch.imagesRaster.files'), filepath)) {
      updateFilesArraySrc(['imagemin', 'all', 'files']);
      updateFilesArraySrc(['copy', 'images', 'files']);
    }

    if (grunt.file.isMatch(grunt.config('watch.imagesVector.files'), filepath)) {
      updateFilesArraySrc(['svgmin', 'all', 'files']);
      updateFilesArraySrc(['copy', 'images', 'files']);
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-ftpscript');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.registerTask('default',
    [
      'jshint',
      'clean',
      'imagemin',
      'svgmin',
      'copy',
      'stylus:dev',
      'assemble:dev',
      'express:dev',
      'open:dev',
      'watch'
    ]
  );

  grunt.registerTask('build',
    [
      'jshint',
      'clean',
      'imagemin',
      'svgmin',
      'copy',
      'assemble:prod',
      'htmlmin:prod',
      'stylus:prod',
      'uglify:prod'
    ]
  );

  grunt.registerTask('preview',
    [
      'build',
      'express:prod',
      'open:prod',
      'express-keepalive'
    ]
  );

  grunt.registerTask('deploy',
    [
      'build',
      'ftpscript:withoutAssets'
    ]
  );

  grunt.registerTask('deploy:all',
    [
      'build',
      'ftpscript:all'
    ]
  );
};
