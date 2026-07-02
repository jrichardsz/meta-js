import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: isModuleVariable', function() {
  it('is a simple variable at the left', function() {
    var isVariableWithThis = AnnotationHelper.isModuleVariable("this.field;");
    expect(isVariableWithThis).to.equal(true);
  });
  it('is a simple variable with spaces at the start', function() {
    var isVariableWithThis = AnnotationHelper.isModuleVariable("   this.field;");
    expect(isVariableWithThis).to.equal(true);
  });
  it('is a simple variable with spaces after name', function() {
    var isVariableWithThis = AnnotationHelper.isModuleVariable("   this.field  ;");
    expect(isVariableWithThis).to.equal(true);
  });
  it('is not a variable declaration', function() {
    var isVariableWithThis = AnnotationHelper.isModuleVariable("   var field  ;");
    expect(isVariableWithThis).to.equal(false);
  });
  it('if variables will be autowired, initial value is not allowed', function() {
    var isVariableWithThis = AnnotationHelper.isModuleVariable("this.field = 5 ;");
    expect(isVariableWithThis).to.equal(false);
  });
});
