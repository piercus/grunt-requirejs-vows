var rjs = require('requirejs');
var assert = require("assert");
var generateFTopic = require("../lib/generateFTopic.js");

module.exports = function(test){

      var fTopic = generateFTopic(test, false)

      var fExpected = function(out) {
        assert.deepEqual(out, test.output);
      };

      var errorExpected = function(e, out){
        assert(e);
      };

      res = {
        topic : fTopic
      };

      if(test.outputError){
        res['error as expected'] = errorExpected
      } else if(test.outputCondition){
        res['output follows specific condition'] = test.outputCondition;
      } else {
        res['output is the expected'] = fExpected
      }

      return res;
};
