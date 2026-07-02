import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

var file1 =
`
[RouteHandler(entrypoint = "true")]
function EntrypointAction() {

  [Autowire(name="example")]
  this.foo;

}

module.exports = EntrypointAction;
`;

var file2 =
`
[RouteHandler(entrypoint = "true")]
export class EntrypointAction   {

  [Autowire(name="example")]
  foo;

}
`;

describe('AnnotationHelper: Get class/module name', function() {
  it('should get the module exported name', function() {
    var exportedModuleName = AnnotationHelper.getExportedModuleName(file1);    
    expect(exportedModuleName).to.equal("EntrypointAction");
  });  
  
  it('should get the class exported name', function() {
    var exportedModuleName = AnnotationHelper.getExportedClassName(file2);    
    expect(exportedModuleName).to.equal("EntrypointAction");
  });
});
