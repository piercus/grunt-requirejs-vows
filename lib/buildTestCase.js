var buildSyncTestCase = require("../lib/buildSyncTestCase.js");
var buildAsyncTestCase = require("../lib/buildAsyncTestCase.js");


module.exports = function(test){
  var res = {};

  res[test.name] = test.async ? buildAsyncTestCase(test) : buildSyncTestCase(test);

  return res;
};
