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

### Gruntfile

```js

module.exports = function(grunt) {

  grunt.initConfig({

    "requirejs-vows": {
      jsonsFiles: {
        rjsModules : ["example/basic"],
      }
    }
  });

  grunt.loadNpmTasks('grunt-requirejs-vows');

  grunt.registerTask('test', [
    "requirejs-vows"
  ]);

};

```

### Requirejs Modules

### test Module

in `./examples/basicTest.js`

```js
define("examples/basicTest",[
    "example/addition",
    "example/setTimeout"
  ],function(addition, setTimeout){

  return function(cb){
    return [{
      // test addition function
        inputArgs : [3,4],
        output : 7,
        fn : addition
      },{
      // test addition function
        inputArgs : [3,"a"],
        outputError : true,
        fn : addition
      },{
        input: {
          delay : 3000,
          foo : "bar"
        },
        output : {
          foo_foo : "bar"
        },
        async : true,
        fn : setTimeout
    }];
  };

})
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
    setTimeout(obj.delay, function(){
      var res = {}

      for(key in obj) if(obj.hasOwnProperty(key)){
        res[key+"_foo"] = obj[key]
      }

      cb(null, res);
    });
  };

})
```
