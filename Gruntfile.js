module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      standard:{
        options: {
          linenos: false,
          paths: ['public/assets/css'],
          import: ['nib', 'vars']
        },
        files : {
          'public/assets/css/standard.main.css' : ['public/assets/css/normalize.styl','public/assets/css/standard.main.styl' ],
        }
      },
      flex:{
        options: {
          linenos: false,
          paths: ['public/assets/css'],
          import: ['nib', 'vars']
        },
        files : {
          'public/assets/css/flex.main.css' : ['public/assets/css/normalize.styl','public/assets/css/flex.main.styl' ],
        }
      }
    },
    concat: {
      controllers: {
        options: {
          separator: ';',
          footer: '/*! <%= pkg.name %> - v<%= pkg.version %> -  */'
        },
        files: {
          'public/app/controllers.js' : ['public/app/controllers/*.js']
        }
      },
      publicjs: {
        options: {
          separator: ';',
          footer: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'public/assets/js/lib/jq.js' : ['public/assets/js/lib/jquery.min.js', 'public/assets/js/lib/jquery-ui.min.js']
        }
      }
      
    },
    watch: {
      css: {
        files: ['public/assets/css/*.styl', 'public/assets/css/**/*.styl'],
        tasks: ['stylus:standard', 'stylus:flex']
      },
      html: {
        files: ['public/*.html'],
        tasks: ['concat:publicjs', 'stylus:standard', 'stylus:flex']
      },
      controllers: {
        files: ['public/app/*.js', 'public/app/controllers/*.js'],
        tasks: ['concat:controllers']
      },
      scripts: {
        files: ['public/assets/js/*.js', 'public/assets/js/**/.js'],
        tasks: ['concat:publicjs']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  // Default task(s).
  grunt.registerTask('default', ['concat:controllers', 'concat:publicjs','stylus:standard', 'stylus:flex', 'watch']);

};