module.exports = function(grunt) {

  grunt.initConfig({

    "requirejs-vows": {
      jsonsFiles: {
        options : {
          rjsModules : ["examples/basicTest"],
          baseUrl : __dirname
        }
      }
    }
  });

  //grunt.loadNpmTasks('grunt-requirejs-vows');
  require('./index.js')(grunt);

  grunt.registerTask('test', [
    "requirejs-vows"
  ]);

};
