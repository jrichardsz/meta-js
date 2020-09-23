const include = require('nodejs-require-enhancer');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AnnotationHelper = include('org/metajs/core/AnnotationHelper.js');

var file1 =
`function ClickCounterAction() {

  //@Autowire(name="example")
  this.liveExample;
`;

var file2 =
`function ClickCounterAction() {

  //@Autowire(name="homePageTemplate")
  //@Render(required="true")
  this.homePage;

`;

var file3 =
`function ClickCounterAction() {

  //@Render(required="true")
  this.homePage;

  //@Autowire(name="anotherAction")
  this.anotherAction;

`;

var file4 =
`function ClickCounterAction() {

  //@ActionListener(tagId="clickButton")
  this.displayQuote = (aaa) => {
    return x * y
  };
`;

var file5 =
`function ClickCounterAction() {

  //@Autowire(name="displayQuote")
  //@ActionListener(tagId="clickButton")
  this.displayQuote = (x, y) => {
    return x * y
  };
`;

describe('AnnotationHelper: getDependecyAnnotationsGroupByVariableOrFunction', function() {
  it('file has one variable with one annotation', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file1.split("\n");
    var foundAnnotations = AnnotationHelper.getDependecyAnnotationsGroupByVariableOrFunction(lines, internalAnnotationsRegexString);
    assert(foundAnnotations);console.log(JSON.stringify(foundAnnotations));
    assert(foundAnnotations.variables.liveExample);
    expect(foundAnnotations.variables.liveExample.length).to.equal(1);
    expect(foundAnnotations.variables.liveExample[0].name).to.equal("Autowire");
    expect(foundAnnotations.variables.liveExample[0].arguments.name).to.equal("example");
  });
  it('file has one variable with two annotations', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file2.split("\n");
    var foundAnnotations = AnnotationHelper.getDependecyAnnotationsGroupByVariableOrFunction(lines, internalAnnotationsRegexString);
    assert(foundAnnotations);
    assert(foundAnnotations.variables.homePage);
    expect(foundAnnotations.variables.homePage.length).to.equal(2);
    expect(foundAnnotations.variables.homePage[0].name).to.equal("Render");
    expect(foundAnnotations.variables.homePage[0].arguments.required).to.equal("true");
    expect(foundAnnotations.variables.homePage[1].name).to.equal("Autowire");
    expect(foundAnnotations.variables.homePage[1].arguments.name).to.equal("homePageTemplate");
  });
  it('file has 2 variables with one annotation each one', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file3.split("\n");
    var foundAnnotations = AnnotationHelper.getDependecyAnnotationsGroupByVariableOrFunction(lines, internalAnnotationsRegexString);
    assert(foundAnnotations);
    assert(foundAnnotations.variables.homePage);
    expect(foundAnnotations.variables.homePage.length).to.equal(1);
    expect(foundAnnotations.variables.homePage[0].name).to.equal("Render");
    expect(foundAnnotations.variables.homePage[0].arguments.required).to.equal("true");
    assert(foundAnnotations.variables.anotherAction);
    expect(foundAnnotations.variables.anotherAction.length).to.equal(1);
    expect(foundAnnotations.variables.anotherAction[0].name).to.equal("Autowire");
    expect(foundAnnotations.variables.anotherAction[0].arguments.name).to.equal("anotherAction");
  });
  it('file has one function with one annotation', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file4.split("\n");
    var foundAnnotations = AnnotationHelper.getDependecyAnnotationsGroupByVariableOrFunction(lines, internalAnnotationsRegexString);
    assert(foundAnnotations);
    console.log(JSON.stringify(foundAnnotations, null, 4));
    assert(foundAnnotations.functions.displayQuote);
    expect(foundAnnotations.functions.displayQuote.length).to.equal(1);
    expect(foundAnnotations.functions.displayQuote[0].name).to.equal("ActionListener");
    expect(foundAnnotations.functions.displayQuote[0].arguments.tagId).to.equal("clickButton");
  });
  it('file has one function with two annotations', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file5.split("\n");
    var foundAnnotations = AnnotationHelper.getDependecyAnnotationsGroupByVariableOrFunction(lines, internalAnnotationsRegexString);
    assert(foundAnnotations);
    console.log(JSON.stringify(foundAnnotations, null, 4));
    assert(foundAnnotations.functions.displayQuote);
    expect(foundAnnotations.functions.displayQuote.length).to.equal(2);
    expect(foundAnnotations.functions.displayQuote[0].name).to.equal("ActionListener");
    expect(foundAnnotations.functions.displayQuote[0].arguments.tagId).to.equal("clickButton");
    expect(foundAnnotations.functions.displayQuote[1].name).to.equal("Autowire");
    expect(foundAnnotations.functions.displayQuote[1].arguments.name).to.equal("displayQuote");
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
