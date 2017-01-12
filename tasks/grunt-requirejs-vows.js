'use strict';

var async = require("async");
var vows = require("vows");
var buildTestCase = require("../lib/buildTestCase.js");
var path = require("path");

var isArray = ('isArray' in Array) ? Array.isArray : function (value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};

var arrayFlatten = function(array) { // same as above but the "not-in-the-return" values are the one where f(el) is true
  var res = [];
  for (var i = -1, n = array.length; ++i < n; ) {
    if (isArray(array[i])) {
      res = res.concat(arrayFlatten(array[i]))
    } else {
      res = res.concat(array[i]);
    }
  }
  return res;
};

module.exports = function(grunt) {
  grunt.registerMultiTask('requirejs-vows', 'Use vows js to test requirejs/amd modules', function() {

    var testTarget = this.target;
    var done = this.async();
    var options = this.options();
    var rjsModules = options.rjsModules;
    var baseUrl = options.baseUrl;
    var label = options.baseUrl || "generated vows test suite";
    var cliFilters = options.cliFilters || [];
    var rjsConfig = options.rjsConfig;
    var rjsModule = options.rjsModule;
    var beforeAll = options.beforeAll;
    var afterAll = options.afterAll;

    var doNothingModule = function(cb){cb()};

    var filterCases = function(inputCases){
      var outputCases = [];

      var cliIndex = grunt.option("index")

      for(var i = 0; i < inputCases.length; i++){
        var selected = true

        for (var j = 0; j < cliFilters.length; j++){
          var value = grunt.option(cliFilters[j]);

          if(value && inputCases[i][cliFilters[j]] !== value){
            grunt.log.debug("index "+i+" filtered because "+cliFilters[j]+" filter : "+ inputCases[i][cliFilters[j]] +"!=="+ value);
            selected = false;
          }


        }

        inputCases[i].index = i;

        if(typeof(cliIndex) !== "undefined" && cliIndex != i){
          grunt.log.debug("index "+i+" filtered because of index filter");
          selected = false;
        }

        if(selected){
          outputCases.push(inputCases[i]);
        }
      }

      return outputCases;
    };

    if(rjsModules.length == 0){
      grunt.fail.fatal("options.rjsModules must be set");
    }

    if(rjsModule){
      var rjs = rjsModule;
    } else {
      grunt.fail.fatal("Please provide a rjsModule into requirejs-vows options")
    }

    if(rjsConfig){
      //console.log(process.argv[1], __filename, __dirname, process.env.PWD, rjsConfigFile)
      //require(path.join(process.env.PWD,rjsConfigFile));
      rjs.config(rjsConfig);

    } else if(!rjsModule){
      grunt.fail.fatal("Please provide a rjsConfig into requirejs-vows options")
    }

    rjs.define("grunt-requirejs-vows-options", function(){
      return options;
    });

    var modulesDescription = rjsModules.map(function(mod){
      if(typeof(mod) === "string"){
        return {
          name : mod,
          mode : "functional"
        };
      } else {
        mod.name = mod.name || mod.moduleName || mod.module;
        return mod;
      }
    });

    var rjsModulesNames = modulesDescription.map(function(m){return m.name});

    if(beforeAll){
      rjsModulesNames.push(beforeAll)
    }
    if(afterAll){
      rjsModulesNames.push(afterAll)
    }

    //var label = "test suite with options feature : "+testFeature +", and category : "+testCategory+", and index : "+testIndex;
    rjs(rjsModulesNames, function() {
      var args = Array.prototype.slice.call(arguments), afterAllModule, beforeAllModule;

      if(afterAll){
        afterAllModule = args.pop();
      } else {
        afterAllModule = doNothingModule
      }

      if(beforeAll){
        beforeAllModule = args.pop();
      } else {
        beforeAllModule = doNothingModule;
      }

      var modules = args;

      grunt.log.debug(rjsModulesNames.length+ " modules loaded : "+rjsModulesNames);

      var runModules = function(cb){
        async.parallel(modules, function(err, results){
          if(err){
            return grunt.fail.fatal(err);
          }

          var vowsSuite = vows.describe(label);

          var vowsBatches = [];
          var cases = filterCases(arrayFlatten(results));
          grunt.log.debug("Inside Module : "+cases.length);

          for(var i = 0; i < cases.length; i++){
            if(cases[i].name){
              grunt.log.debug("Adding Case : "+cases[i].name+"-"+cases[i].index);
              var vowsTest = buildTestCase(cases[i], cases[i].index);
            } else {
              var vowsTest = {};
              var index = cases[i].index;
              for (var j in cases[i]) if(cases[i].hasOwnProperty(j)) {
                if(j !== "index"){
                  vowsTest[j+"-"+index] = cases[i][j]
                  grunt.log.debug("Adding Case : "+j+"-"+index);
                }
              }
            }
            vowsSuite.addBatch(vowsTest);
          }

          //console.log("run", cases[0]);

          vowsSuite.run({verbose : true}, cb);
        });
      };

      beforeAllModule(function(){
        runModules(function(){
          afterAllModule(done);
        });
      });

    });

  });
};
