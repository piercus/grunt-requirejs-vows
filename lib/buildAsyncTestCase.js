var rjs = require('requirejs');
var assert = require("assert");
var generateFTopic = require("../lib/generateFTopic.js");

module.exports = function(test){
    var fTopic = generateFTopic(test, true);

    var fExpected = function(out) {
      assert.deepEqual(out, test.output);
    };

    var errorExpected = function(e, out){
      assert(e);
    };

    var noErrorExpected = function(e, out){
      assert(!e);
    };

    res = {
      topic : fTopic
    };

    if(typeof(test.outputError) !== "undefined"){
      if(test.outputError){
        res['error as expected'] = errorExpected
      } else {
        res['error as expected'] = noErrorExpected
      }
    } else {
      res['output is the expected'] = fExpected
    }

    return res;
};
