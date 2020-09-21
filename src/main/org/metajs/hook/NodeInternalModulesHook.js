function NodeInternalModulesHook() {}
NodeInternalModulesHook._compile = function() {
  var Module = require('module');
  var original_compile = Module.prototype._compile;
  Module.prototype._compile = function(content, filename) {    
    //TODO: avoid iteration with simple content.replace(/^\s*@/g, '//@');
    // content = content.replace(/.*@/g, '//@');
    // content = content.replace(/^\s*@/g, '//@');
    // content = content.replace(/@/g, '//@');    
    var annotationMatchs = content.match(/@[A-Z]\w+/g);
    if(annotationMatchs != null && typeof annotationMatchs[Symbol.iterator] === 'function' ){
      for(let annotationMatch of annotationMatchs ){
        content = content.replace(annotationMatch, '//'+annotationMatch);  
      }      
    }
    return original_compile.call(this, content, filename);
  };
}

module.exports = NodeInternalModulesHook;
