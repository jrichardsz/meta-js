import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: isClassicVariable', function() {
  it('is a simple variable at the left', function() {
    var isClassicVariable = AnnotationHelper.isClassicVariable("var duke;");
    expect(isClassicVariable).to.equal(true);
  });
  it('is a simple variable with spaces at the start', function() {
    var isClassicVariable = AnnotationHelper.isClassicVariable("   var duke;");
    expect(isClassicVariable).to.equal(true);
  });
  it('is a simple variable with spaces after name', function() {
    var isClassicVariable = AnnotationHelper.isClassicVariable("   var duke  ;");
    expect(isClassicVariable).to.equal(true);
  });
  it('is not a variable declaration', function() {
    var isClassicVariable = AnnotationHelper.isClassicVariable("   var _duke  ;");
    expect(isClassicVariable).to.equal(false);
  });
});
