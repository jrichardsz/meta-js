import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: isModuleAsyncFunction', function() {
  it('is a simple async arrow function without arguments and without spaces', function() {
    var isModuleFunction = AnnotationHelper.isES6AsyncFunction("async displayQuote () {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function without arguments and several spaces', function() {
    var isModuleFunction = AnnotationHelper.isES6AsyncFunction("   async   displayQuote  ()    {  ");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with one argument', function() {
    var isModuleFunction = AnnotationHelper.isES6AsyncFunction("async displayQuote(a){");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with one argument and spaces', function() {
    var isModuleFunction = AnnotationHelper.isES6AsyncFunction("async displayQuote ( aaa ) {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with two arguments', function() {
    var isModuleFunction = AnnotationHelper.isES6AsyncFunction("async displayQuote (aaa,bbb) {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with three arguments', function() {
    var isModuleFunction = AnnotationHelper.isES6AsyncFunction("async displayQuote (aaa,bbb,cccc) {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async function with three arguments and spaces', function() {
    var isES6AsyncFunction = AnnotationHelper.isES6AsyncFunction("async displayQuote( aaa ,bbb , ccccc )  {");
    expect(isES6AsyncFunction).to.equal(true);
  });
});
