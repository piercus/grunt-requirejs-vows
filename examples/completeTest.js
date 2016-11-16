define("examples/completeTest",[
    "examples/fn/addition",
    "examples/fn/createFile",
  ],function(addition, createFile){

  return function(cb){
    cb(null, [{
          // test addition function
            name : "test addition function does not throw error",
            inputArgs : [3,4],
            fn : addition,
            outputError : false,
        },{
          // test addition function
            name : "test addition function does not throw error",
            inputArgs : [1,-1],
            fn : addition,
            output : 0
        },{
          // test addition function
            name : "test createFile function",
            inputArgs : ["tmp.txt"],
            fn : createFile,
            filesCreated : ["tmp.txt"]
      }]);
  };
});
