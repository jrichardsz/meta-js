require('nodejs-require-enhancer');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AnnotationHelper = require('org/metajs/core/AnnotationHelper.js');

var file1 =
`
//@DefaultAction(name="acmeAction")
function AcmeAction() {
  var $ = this;

  //@Autowire
  this.liveExample;

  function dummy(){};`;

var file2 =
`
//@Dummy(name="name")
function AcmeAction() {

  //@Autowire
  this.liveExample;

  function dummy(){};`;

//TODO: add extra validation to ensure that these head anottations
// are in the top of the file
describe('AnnotationHelper: getHeadAnnotationMetadata', function() {
  var headAnnotations = ["DefaultAction"]
  var stringRegex = AnnotationHelper.createRegexFromAnnotations(headAnnotations);

  it('must have @DefaultAction annotation', function() {
    var haveHeadAnnotation = AnnotationHelper.getHeadAnnotationMetadata(file1, stringRegex);
    assert(haveHeadAnnotation);
    expect(haveHeadAnnotation.name).to.equal("DefaultAction");
    expect(haveHeadAnnotation.arguments.name).to.equal("acmeAction");
  });
  it('has not any known annotation', function() {
    var haveHeadAnnotation = AnnotationHelper.getHeadAnnotationMetadata(file2, stringRegex);
    assert(!haveHeadAnnotation);
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
