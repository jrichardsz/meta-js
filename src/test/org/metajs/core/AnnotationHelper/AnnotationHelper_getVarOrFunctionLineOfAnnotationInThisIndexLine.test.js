var chai = require('chai');
var expect = chai.expect;
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

var file1 =
`function ClickCounterAction() {
  var $ = this;

  //@Autowire
  this.liveExample;

  function dummy(){};`;

var file2 =
`function ClickCounterAction() {
  var $ = this;

  //@Autowire(name="name")
  //@Render(name="name")
  this.liveExample;

  function dummy(){};`;

var file3 =
`function ClickCounterAction() {
  var $ = this;

  //@Autowire(name="name")
  //@Render(name="name")
  //@ActionListener(name="name")
  this.template;

  function dummy(){};`;

describe('AnnotationHelper: getVarOrFunctionLineOfAnnotationInThisIndexLine', function() {
  it('#1 if var has one annotation should get the real var', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file1.split("\n");
    var data = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, 3, internalAnnotationsRegexString);
    expect(data.line).to.equal("  this.liveExample;");
    expect(data.index).to.equal(4);
  });
  it('#2 if var has two annotations should get the real var', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file2.split("\n");
    var data = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, 3, internalAnnotationsRegexString);
    expect(data.line).to.equal("  this.liveExample;");
    expect(data.index).to.equal(5);
  });

  it('#3 if var has several annotations should get the real var', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file3.split("\n");
    var data = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, 3, internalAnnotationsRegexString);
    expect(data.line).to.equal("  this.template;");
    expect(data.index).to.equal(6);
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
