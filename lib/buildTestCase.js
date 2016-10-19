var buildSyncTestCase = require("../lib/buildSyncTestCase.js");
var buildAsyncTestCase = require("../lib/buildAsyncTestCase.js");


module.exports = function(test, index){
  var res = {};

  res[test.name+"-"+index] = test.async ? buildAsyncTestCase(test) : buildSyncTestCase(test);

  return res;
};
