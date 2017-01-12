
module.exports = function(grunt) {

  require('./tasks/grunt-requirejs-vows')(grunt);

  var rjs = require("requirejs");

  grunt.initConfig({
    "requirejs-vows": {
      example: {
        options : {
          rjsModules : ["examples/basicTest", "examples/completeTest", "examples/vowsTest"],
          rjsModule : rjs,
          rjsConfig : {
            baseUrl : __dirname
          }, // see http://requirejs.org/docs/api.html#config
          cliFilters : ["fooFilter"]
        }
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        metadata: '',
        regExp: false
      }
    }
  });

  grunt.loadNpmTasks("grunt-bump");

  grunt.registerTask('test', [
    "requirejs-vows"
  ]);

};
