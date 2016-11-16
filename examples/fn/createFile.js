define("examples/fn/createFile",[
  "fs"
],function(fs){

  return function(filename){
    fs.writeFileSync(filename, "something")
  };

})
