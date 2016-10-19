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
    "examples/addition",
    "examples/setTimeout"
  ],function(addition, setTimeout){

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
          foo : "bar"
        },
        output : {
          foo_foo : "bar"
        },
        async : true,
        fn : setTimeout
    }]);
  };
});
```

### addition

in `./examples/addition.js`

```js
define("examples/addition",[
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

in `./examples/setTimeout.js`

```js
define("examples/setTimeout",[
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
