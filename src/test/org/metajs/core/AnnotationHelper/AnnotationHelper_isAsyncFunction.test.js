var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

describe('AnnotationHelper: isModuleAsyncFunction', function() {
  it('is a simple async arrow function without arguments and without spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote=async()=>{");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function without arguments', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote = async () => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function without arguments and several spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("  this.displayQuote = async  ()  =>   {  ");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with one argument', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote = async (a) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with one argument and spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote = async ( aaa ) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with two arguments', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote = async (aaa,bbb) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with three arguments', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote = async (aaa,bbb,cccc) => {");
    expect(isModuleFunction).to.equal(true);
  });
  it('is a simple async arrow function with three arguments and spaces', function() {
    var isModuleFunction = AnnotationHelper.isModuleAsyncFunction("this.displayQuote = async ( aaa ,bbb , ccccc ) => {");
    expect(isModuleFunction).to.equal(true);
  });
});
