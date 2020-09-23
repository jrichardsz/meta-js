const include = require('nodejs-require-enhancer');
var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = include('org/metajs/core/AnnotationHelper.js');

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

  let output;
  const originalLogFunction = console.log;
  beforeEach(function() {
    output = '';
    console.log = (msg) => {
      output += msg + '\n';
    };
  });

  afterEach(function() {
    console.log = originalLogFunction; // undo dummy log function
    if (this.currentTest.state === 'failed') {
      console.log("Log:");
      console.log(output);
    }
  });
});
