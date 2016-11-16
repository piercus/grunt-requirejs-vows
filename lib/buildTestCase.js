var assert = require("assert");
var generateFTopic = require("../lib/generateFTopic.js");
var fs = require("fs");

var testBuilder = function(test){
    var fTopic = generateFTopic(test, test.async);

    var fExpected = function(out) {
      assert.deepEqual(out, test.output);
    };

    var errorExpected = function(e, out){
      assert(e);
    };

    var noErrorExpected = function(e, out){
      assert(!e,"Error is"+(e&&e.stack));
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
      if (typeof(test.output) !== "undefined"){
        res['output is the expected'] = fExpected
      }
      if (typeof(test.outputCondition) !== "undefined"){
        res['output follows specific condition'] = test.outputCondition;
      }

      //console.log(test.filesCreated);
      if(typeof(test.filesCreated) !== "undefined"){
        res['proper files have been created'] = function(){
          for(var k = 0; k < test.filesCreated.length; k++){
            assert.isTrue(fs.existsSync(test.filesCreated[k]), test.filesCreated[k] + " not found in filesystem");
          }
        }
      }

    }


    return res;
};


module.exports = function(test, index){
  var res = {};

  res[test.name+"-"+index] = testBuilder(test);

  return res;
};
