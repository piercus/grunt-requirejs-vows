[![Build Status](https://travis-ci.org/piercus/grunt-requirejs-vows.svg?branch=master)](https://travis-ci.org/piercus/grunt-requirejs-vows)

## grunt-engine-vows

Use vows js to test requirejs/amd modules

## Why require js ?

* Portable JS
* Maturity

## Why Vows js ?

* No global variable
* Asynchronous

### Installation

```
npm install --save-dev grunt-requirejs-vows
```

## Usage

### Basic Gruntfile example

```js
var rjs = require("requirejs");

module.exports = function(grunt) {

  grunt.initConfig({
    "requirejs-vows": {
      example: {
        options : {
          rjsModules : ["examples/basicTest", "examples/vowsTest"],
          rjsModule : rjs,
          rjsConfig : {
            baseUrl : __dirname
          }, // see http://requirejs.org/docs/api.html#config
          cliFilters : ["fooFilter"],
          fooOption : "barValue"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-requirejs-vows');

  grunt.registerTask('test', [
    "requirejs-vows"
  ]);

};

```
#### Launch tests

```sh
grunt test

# only run 2nd test
grunt test --index=2

# only run 2nd tests with fooFilter=bar
grunt test --fooFilter=bar
```

### Requirejs Modules

### test Module

in `./examples/basicTest.js`

```js
define("examples/basicTest",[
    "examples/fn/addition",
    "examples/fn/setTimeout",
    "grunt-requirejs-vows-options"
  ],function(addition, setTimeout, options){

  return function(cb){
    cb(null, [{
      // test addition function
        name : "test addition function",
        inputArgs : [3,4],
        output : 7,
        fn : addition,
        fooFilter : "bar"
      },{
        name : "test addition function thorw error",
        inputArgs : [3,"a"],
        outputError : true,
        fn : addition
      },{
        name : "test setTimeout function",
        input: {
          delay : 3000,
          foo : "bar",
          gruntOptions : options
        },
        output : {
          foo_foo : "bar",
          gruntOptions_foo : options
        },
        async : true,
        fn : setTimeout
    }]);
  };
});
```

in `./examples/vowsTest.js`
```js
define("examples/vowsTest",[
    "vows",
    "assert"
  ],function(vows, assert){

    return function(cb){
      // Create a Test Suite
      var cases = {
          'when dividing a number by zero': {
              topic: function () { return 42 / 0 },

              'we get Infinity': function (topic) {
                  assert.equal (topic, Infinity);
              }
          },
          'but when dividing zero by zero': {
              topic: function () { return 0 / 0 },

              'we get a value which': {
                  'is not a number': function (topic) {
                      assert.isNaN (topic);
                  },
                  'is not equal to itself': function (topic) {
                      assert.notEqual (topic, topic);
                  }
              }
          }
      };
      cb(null, cases);
    };
});
```
### addition

in `./examples/fn/addition.js`

```js
define("examples/fn/addition",[
  ],function(){

  return function(a,b){
    if(typeof(a) !== "number" || typeof(b) !== "number"){
      throw(new Error("addition takes 2 numbers as arguments"));
    }
    return a+b;
  };

})
```

### object input

in `./examples/fn/setTimeout.js`

```js
define("examples/fn/setTimeout",[
  ],function(){

  return function(obj, cb){
    setTimeout(function(){
      var res = {}

      delete obj.delay;

      for(key in obj) if(obj.hasOwnProperty(key)){
        res[key+"_foo"] = obj[key]
      }

      cb(null, res);
    },obj.delay);
  };

});
```
