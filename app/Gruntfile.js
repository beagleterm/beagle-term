module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    jshint: {
      all: {
        src: [
          'js/index.js', 'js/main.js'
        ]
      }
    },
    jscs: {
      src: ['Gruntfile.js', 'js/*.js'],
      options: {
        config: '.jscsrc',
        fix: true
      }
    },
    watch: {
        files: ['js/index.js', 'js/main.js'],
        tasks: ['jshint', 'jscs']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jscs', 'watch']);

  // Test task
  grunt.registerTask('test', ['jshint', 'jscs']);
};
