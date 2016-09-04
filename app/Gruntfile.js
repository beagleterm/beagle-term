module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: "<json:package.json>",
    jshint: {
      all: {
        src: [
          "js/index.js", "js/main.js"
        ]
      }
    },
    watch: {
        files: ["js/index.js", "js/main.js"],
        tasks: ["jshint"]
      }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task.
  grunt.registerTask("default", ["jshint", "watch"]);
};
