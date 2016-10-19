module.exports = function(grunt) {

  grunt.initConfig({

    "requirejs-vows": {
      jsonsFiles: {
        options : {
          rjsModules : ["examples/basicTest"],
          baseUrl : __dirname,
          cliFilters : ["fooFilter"]
        }
      }
    }
  });

  //grunt.loadNpmTasks('grunt-requirejs-vows');
  require('./tasks/grunt-requirejs-vows')(grunt);

  grunt.registerTask('test', [
    "requirejs-vows"
  ]);

};
