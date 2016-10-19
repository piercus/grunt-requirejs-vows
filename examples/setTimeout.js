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

});
