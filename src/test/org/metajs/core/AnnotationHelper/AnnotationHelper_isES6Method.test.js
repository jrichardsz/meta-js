import { expect } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

describe('AnnotationHelper: isES6Function', function() {
  it('is a simple async arrow function without arguments and without spaces', function() {
    var isModuleFunction = AnnotationHelper.isES6Function("displayQuote () {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function without arguments and several spaces', function() {
    var isModuleFunction = AnnotationHelper.isES6Function("  displayQuote  ()    {  ");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with one argument', function() {
    var isModuleFunction = AnnotationHelper.isES6Function("displayQuote(a){");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with one argument and spaces', function() {
    var isModuleFunction = AnnotationHelper.isES6Function("displayQuote ( aaa ) {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with two arguments', function() {
    var isModuleFunction = AnnotationHelper.isES6Function("displayQuote (aaa,bbb) {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with three arguments', function() {
    var isModuleFunction = AnnotationHelper.isES6Function("displayQuote (aaa,bbb,cccc) {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async function with three arguments and spaces', function() {
    var isES6Function = AnnotationHelper.isES6Function("displayQuote( aaa ,bbb , ccccc )  {");
    expect(isES6Function).to.equal(true);
  });

  //TODO
  //async displayQuote () {
  //Is detected as not async method isES6Function
  //exclude async
});
