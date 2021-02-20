require('nodejs-require-enhancer');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AnnotationHelper = require('org/metajs/core/AnnotationHelper.js');

describe('AnnotationHelper: getAnnotationNameFromRawAnnotation', function() {
  it('one argument', function() {
    var name = AnnotationHelper.getAnnotationNameFromRawAnnotation('  //@Autowire(name="util")');
    expect(name).to.equal("Autowire");
  });
  it('empty argument', function() {
    var name = AnnotationHelper.getAnnotationNameFromRawAnnotation('  //@Render');
    expect(name).to.equal("Render");
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
