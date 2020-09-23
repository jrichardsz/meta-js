const include = require('nodejs-require-enhancer');
var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = include('org/metajs/core/AnnotationHelper.js');

describe('AnnotationHelper: isEmptyLine', function() {
  it('is a empty line', function() {
    var isEmptyLine = AnnotationHelper.isEmptyLine("");
    expect(isEmptyLine).to.equal(true);
  });
  it('is a spaces  line', function() {
    var isEmptyLine = AnnotationHelper.isEmptyLine("    ");
    expect(isEmptyLine).to.equal(true);
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
