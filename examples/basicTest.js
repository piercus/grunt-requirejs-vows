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
