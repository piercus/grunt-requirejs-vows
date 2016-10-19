define("examples/addition",[
  ],function(){

  return function(a,b){
    if(typeof(a) !== "number" || typeof(b) !== "number"){
      throw(new Error("addition takes 2 numbers as arguments"));
    }
    return a+b;
  };

})
