var fs = require("fs");

module.exports = function(test, useCb) {

  if(typeof(test.filesCreated) !== "undefined"){
    for(var k = 0; k < test.filesCreated.length; k++){
      if(fs.existsSync(test.filesCreated[k])){
        fs.unlinkSync(test.filesCreated[k]);
      }
    }
  }

  return function(){

    if(useCb){
      try {
        if(test.input){
          //console.log("calling", this.callback)
          test.fn(test.input, this.callback);
        } else if(test.inputArgs){
          test.fn.apply(this, test.inputArgs.concat([this.callback]));
        }
      } catch (e){
        this.callback(e);
      }
    } else {
      if(test.input){
        var res = test.fn(test.input);
        return (typeof(res) === "undefined" ? null : res);
      } else if(test.inputArgs){
        var res = test.fn.apply(this, test.inputArgs);
        return (typeof(res) === "undefined" ? null : res);
      }
    }

  };
};
