module.exports = function(test, useCb) {

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
        cb(e);
      }
    } else {
      if(test.input){
        return test.fn(test.input)
      } else if(test.inputArgs){
        return test.fn.apply(this, test.inputArgs)
      }
    }

  };
};
