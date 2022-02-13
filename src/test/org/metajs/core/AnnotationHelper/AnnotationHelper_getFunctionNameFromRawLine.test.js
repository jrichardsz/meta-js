var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

describe('AnnotationHelper: getModuleFunctionNameFromRawLine', function() {
  it('get simple function name', function() {
    var variableName = AnnotationHelper.getModuleFunctionNameFromRawLine("this.displayQuote = () => {");
    expect(variableName).to.equal("displayQuote");
  });
  it('get simple function name with spaces', function() {
    var variableName = AnnotationHelper.getModuleFunctionNameFromRawLine("this.sayHello   = () => {");
    expect(variableName).to.equal("sayHello");
  });
  it('get simple async function', function() {
    var variableName = AnnotationHelper.getModuleFunctionNameFromRawLine("this.sayHello = async () => {");
    expect(variableName).to.equal("sayHello");
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
