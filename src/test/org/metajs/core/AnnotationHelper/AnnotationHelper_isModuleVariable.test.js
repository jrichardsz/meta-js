var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

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
