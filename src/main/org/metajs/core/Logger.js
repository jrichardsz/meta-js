function Logger(){

}

Logger.debug = function(message){
  let logLevel;
  if(typeof logLevel === 'undefined') logLevel = process.env.META_JS_LOG_LEVEL
  if(typeof logLevel !== 'undefined' && logLevel==="debug"){
    if(typeof message === 'object'){
      console.log(JSON.stringify(message, null, 4));
    }else{
      console.log(message);
    }
  }
}

Logger.info = function(message){
  if(typeof message === 'object'){
    console.log(JSON.stringify(message, null, 4));
  }else{
    console.log(message);
  }
}

module.exports = Logger;
