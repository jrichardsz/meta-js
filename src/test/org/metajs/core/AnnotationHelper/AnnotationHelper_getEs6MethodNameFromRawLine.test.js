import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: getEs6MethodNameFromRawLine', function() {
  it('get es6 method name - simple', function() {
    var methodName = AnnotationHelper.getEs6MethodNameFromRawLine("  clickOnSomeHtmlElement (e) {");
    expect(methodName).to.equal("clickOnSomeHtmlElement");
  });  
  it('get es6 async method name - simple', function() {
    var methodName = AnnotationHelper.getEs6AsyncMethodNameFromRawLine(" async clickOnSomeHtmlElement (e) {");
    expect(methodName).to.equal("clickOnSomeHtmlElement");
  });
  it('get es6 async method name - medium', function() {
    var methodName = AnnotationHelper.getEs6AsyncMethodNameFromRawLine("async        clickOnSomeHtmlElement (e) {");
    expect(methodName).to.equal("clickOnSomeHtmlElement");
  });
});
