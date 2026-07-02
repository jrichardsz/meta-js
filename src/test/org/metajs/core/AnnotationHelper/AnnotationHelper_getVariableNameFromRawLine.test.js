import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: getVariableNameFromRawLine', function() {
  it('get simple variable name', function() {
    var variableName = AnnotationHelper.getVariableNameFromRawLine("duke;");
    expect(variableName).to.equal("duke");
  });
  it('get simple variable name with spaces', function() {
    var variableName = AnnotationHelper.getVariableNameFromRawLine("  jane   ;   ");
    expect(variableName).to.equal("jane");
  });
});
