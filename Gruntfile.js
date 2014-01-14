module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> -' +
            ' Licensed under the <%= pkg.license %> License\n*/\n\n',

    // JSHint JavaScript files
    jshint: {
      files: ['Gruntfile.js', 'package.json', 'ghostbooty.js', 'custom.js']
    },

    // Concatenate all JavaScript files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';',
      },
      dist: {
        src: ['assets/js/jquery.js', 'assets/js/bootstrap.js', 'assets/js/ghostbooty.js', 'assets/js/custom.js'],
        dest: 'assets/js/scripts.js'
      },
    },

    // Minify JavaScript with Uglify
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: false
      },
      dist: {
          files: {
            'assets/js/scripts.min.js': ['<%= concat.dist.dest %>']
          }
        }
    },

    // Compile Sass to CSS -  destination : source
    sass: {
      compile: {
        options: {
          style: 'compressed',
          banner: '<%= banner %>'
        },
        files: {
          'assets/css/style.css': 'assets/sass/style.scss'
        },
      },
    },

    // Simple config to run sass, jshint and uglify any time a js or sass file is added, modified or deleted
    watch: {
      sass: {
        files: ['assets/sass/custom.scss', 'assets/sass/ghostbooty.scss', 'assets/sass/style.scss'],
        tasks: ['sass']
      },
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      concat: {
        files : ['<%= concat.dist.src %>'],
        tasks: ['concat']
      },
      uglify: {
        files: ['assets/js/ghostbooty.js', 'assets/js/custom.js'],
        tasks: ['uglify']
      },
    },
  });

  // Load the plug-ins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default tasks
  grunt.registerTask('default', ['jshint', 'concat', 'sass', 'uglify']);

};
