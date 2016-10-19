'use strict';

var rjs = require("requirejs");
var async = require("async");
var vows = require("vows");
var buildTestCase = require("../lib/buildTestCase.js");

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

    var testFeature = grunt.option('feature');
    var testCategory = grunt.option('category');
    var testIndex = grunt.option('index');
    var testEx = grunt.option('ex');
    var done = this.async();
    var options = this.options();
    var rjsModules = options.rjsModules;
    var baseUrl = options.baseUrl;
    var label = options.baseUrl || "generated vows test suite";

    if(rjsModules.length == 0){
      grunt.fail.fatal("options.rjsModules must be set");
    }

    if(baseUrl){
      rjs.config({
        baseUrl : baseUrl
      })
    }

    var filterCases = function(inputCases){
      var outputCases = [];
      /*for(var i = 0; i < inputCases.length; i++){
        if(testFeature && cases.feature !== testFeature){
          continue;
        }
        if(testCategory && cases.category !== testCategory){
          continue;
        }
        if(testEx && cases.ex !== testEx){
          continue;
        }
        if(testIndex && cases.index !== i){
          continue;
        }
        inputCases.index = i;
        outputCases.push(inputCases);
      }*/

      return inputCases;
    };

    //var label = "test suite with options feature : "+testFeature +", and category : "+testCategory+", and index : "+testIndex;

    rjs(rjsModules, function() {

      var modules = Array.prototype.slice.call(arguments);

      async.parallel(modules, function(err, results){
        var vowsBatches = [];
        var cases = filterCases(arrayFlatten(results));

        var vowsSuite = vows.describe(label);

        for(var i = 0; i < cases.length; i++){
          var vowsTest = buildTestCase(cases[i]);
          vowsSuite.addBatch(vowsTest);
          //console.log(vowsTest);
        }

        //console.log("run", cases[0]);

        vowsSuite.run({verbose : true}, function(e){
          done(e);
        });

      });

    });

  });
};
