var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

describe('AnnotationHelper: isModuleFunction', function() {
  it('is a simple arrow function without arguments', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("this.displayQuote = () => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple arrow function without arguments and several spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("  this.displayQuote =  ()  =>   {  ");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple arrow function with one argument', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("this.displayQuote = (a) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple arrow function with one argument and spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("this.displayQuote = ( aaa ) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple arrow function with two arguments', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("this.displayQuote = (aaa,bbb) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple arrow function with three arguments', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("this.displayQuote = (aaa,bbb,cccc) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple arrow function with three arguments and spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleFunction("this.displayQuote = ( aaa ,bbb , ccccc ) => {");
    expect(isModuleFunction).to.equal(true);
  });
});
