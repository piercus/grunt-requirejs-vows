
module.exports = function(grunt) {

  require('./tasks/grunt-requirejs-vows')(grunt);
  
  var rjs = require("requirejs");

  grunt.initConfig({
    "requirejs-vows": {
      example: {
        options : {
          rjsModules : ["examples/basicTest"],
          rjsModule : rjs,
          rjsConfig : {
            baseUrl : __dirname
          }, // see http://requirejs.org/docs/api.html#config
          cliFilters : ["fooFilter"]
        }
      }
    }
  });


  grunt.registerTask('test', [
    "requirejs-vows"
  ]);

};
