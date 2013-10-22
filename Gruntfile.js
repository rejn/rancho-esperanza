module.exports = function(grunt) {

  grunt.initConfig({

    // config settings
    settings: {
      src: 'src',
      dist: 'dist'
    },

    // read package
    pkg: grunt.file.readJSON('package.json'),

    // tasks
    assemble: {
      options: {
        assets: '<%= settings.dist %>/assets',
        flatten: true,
        layout: 'en.hbs',
        layoutdir: '<%= settings.src %>/templates/layouts',
        partials: ['<%= settings.src %>/templates/partials/**/*.{hbs,md}']
      },
      dev: {
        options: {
          dev: true,
          prod: false
        },
        src: ['<%= settings.src %>/*.hbs'],
        dest: '<%= settings.dist %>/'
      },
      prod: {
        options: {
          dev: false,
          prod: true
        },
        src: ['<%= settings.src %>/*.hbs'],
        dest: '<%= settings.dist %>/'
      }
    },
    clean: {
      dist: ['<%= settings.dist %>/**']
    },
    connect: {
      options: {
        base: '<%= settings.dist %>',
        open: true
      },
      dev: {
        options: {
          livereload: true,
          port: 9000
        }
      },
      prod: {
        options: {
          keepalive: true,
          port: 3000
        }
      }
    },
    copy: {
      options: {
        processContentExclude: ['.DS_Store', '.gitignore', 'node_modules']
      },
      images: {
        files: [
          {
            cwd: '<%= settings.src %>/assets/images/',
            dest: '<%= settings.dist %>/assets/images/',
            expand: true,
            filter: 'isFile',
            src: ['**/*.{png,jpg,svg}']
          }
        ]
      },
      scripts: {
        files: [
          {
            cwd: '<%= settings.src %>/assets/scripts/',
            dest: '<%= settings.dist %>/assets/scripts/',
            expand: true,
            filter: 'isFile',
            src: ['**/*.js']
          }
        ]
      },
      staticFiles: {
        files: [
          {
            cwd: '<%= settings.src %>',
            dest: '<%= settings.dist %>',
            expand: true,
            filter: 'isFile',
            src: [
              '**/.*',
              '**/*.*',
              '!**/*.hbs',
              '!templates/**/*.*',
              '!assets/images/**/*.*',
              '!assets/scripts/**/*.*',
              '!assets/styls/**/*.*'
            ]
          }
        ]
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
            cwd: '<%= settings.dist %>',
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
            cwd: '<%= settings.dist %>',
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
            cwd: '<%= settings.dist %>/',
            dest: '<%= settings.dist %>/',
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
            cwd: '<%= settings.src %>/assets/images/',
            dest: '<%= settings.src %>/assets/images/',
            expand: true,
            src: '**/*.{png,jpg}'
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: ['Gruntfile.js'],
      all: [
        '<%= settings.src %>/assets/scripts/**/*.js',
      ]
    },
    stylus: {
      dev: {
        options: {
          compress: false
        },
        files: {
          '<%= settings.dist %>/assets/styles/core.css': '<%= settings.src %>/assets/styls/core.styl'
        }
      },
      prod: {
        options: {
          compress: true
        },
        files: {
          '<%= settings.dist %>/assets/styles/core.css': '<%= settings.src %>/assets/styls/core.styl'
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
            cwd: '<%= settings.src %>/assets/images/',
            dest: '<%= settings.src %>/assets/images/',
            expand: true,
            src: ['**/*.svg']
          }
        ]
      }
    },
    uglify: {
      prod: {
        files: {
          '<%= settings.dist %>/assets/scripts/core.js': ['<%= settings.src %>/assets/scripts/core.js']
        }
      }
    },
    watch: {
      assemble: {
        files: ['<%= settings.src %>/**/*.hbs'],
        tasks: ['assemble:dev']
      },
      dist: {
        options: {
          livereload: true,
        },
        files: [
          '<%= settings.dist %>/**/*.html',
          '<%= settings.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= settings.dist %>/assets/scripts/**/*.js',
          '<%= settings.dist %>/assets/styles/**/*.css'
        ]
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      imagesRaster: {
        files: ['<%= settings.src %>/assets/images/**/*.{jpg,png}'],
        tasks: [
          'newer:imagemin',
          'newer:copy:images'
        ]
      },
      imagesVector: {
        files: ['<%= settings.src %>/assets/images/**/*.svg'],
        tasks: [
          'newer:svgmin',
          'newer:copy:images'
        ]
      },
      staticFiles: {
        files: [
          '<%= settings.src %>/**/*',
          '<%= settings.src %>/.*',
          '!<%= settings.src %>/**/*.hbs',
          '!<%= settings.src %>/templates/**',
          '!<%= settings.src %>/assets/images/**/*',
          '!<%= settings.src %>/assets/styls/**/*' ],
        tasks: [
          'newer:copy:staticFiles',
          'newer:copy:scripts'
        ]
      },
      stylus: {
        files: ['<%= settings.src %>/assets/styls/**/*.styl'],
        tasks: ['stylus:dev']
      },
    }
  });

  // load tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  // register tasks
  grunt.registerTask('prep',
    [
      'jshint',
      'clean',
      'imagemin',
      'svgmin',
      'copy'
    ]
  );

  grunt.registerTask('build',
    [
      'prep',
      'stylus:prod',
      'uglify:prod',
      'assemble:prod',
      'htmlmin:prod'
    ]
  );

  grunt.registerTask('preview',
    [
      'build',
      'connect:prod'
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

  grunt.registerTask('default',
    [
      'prep',
      'stylus:dev',
      'assemble:dev',
      'connect:dev',
      'watch'
    ]
  );
};
