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
