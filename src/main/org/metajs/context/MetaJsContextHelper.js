function MetaJsContextHelper() {}

MetaJsContextHelper.getDependencyByAnnotationName = function(name, dependencies) {
  for (let dependency of dependencies) {
    if(dependency.meta.name == name){
      return dependency;
    }
  }  
}

module.exports = MetaJsContextHelper;
