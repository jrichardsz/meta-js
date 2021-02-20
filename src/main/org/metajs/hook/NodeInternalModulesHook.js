function NodeInternalModulesHook() {}
NodeInternalModulesHook._compile = function() {
  var Module = require('module');
  var original_compile = Module.prototype._compile;
  Module.prototype._compile = function(content, filename) {    
    //TODO: use more complex regex to detect annotations
    //improve regex to match only @annotations instead of any string like @ upper case letter ...
    content = content.replace(/(@[A-Z]\w+)/g, "//$1");
    return original_compile.call(this, content, filename);
  };
}

module.exports = NodeInternalModulesHook;
