import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: isEmptyLine', function() {
  it('is a empty line', function() {
    var isEmptyLine = AnnotationHelper.isEmptyLine("");
    expect(isEmptyLine).to.equal(true);
  });
  it('is a spaces  line', function() {
    var isEmptyLine = AnnotationHelper.isEmptyLine("    ");
    expect(isEmptyLine).to.equal(true);
  });
});
