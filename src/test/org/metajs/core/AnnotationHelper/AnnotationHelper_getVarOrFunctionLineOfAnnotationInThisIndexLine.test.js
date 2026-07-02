import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

var file1 =
`export default ClickCounterAction() {
  var $ = this;

  [Autowire]
  liveExample;

  function dummy(){};`;

var file2 =
`export default ClickCounterAction() {
  var $ = this;

  [Autowire(name="name")]
  [Render(name="name")]
  liveExample;

  function dummy(){};`;

var file3 =
`export default ClickCounterAction() {
  var $ = this;

  [Autowire(name="name")]
  [Render(name="name")]
  [ActionListener(name="name")]
  template;

  function dummy(){};`;

describe('AnnotationHelper: getVarOrFunctionLineOfAnnotationInThisIndexLine', function() {
  it('#1 if var has one annotation should get the real var', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file1.split("\n");
    var data = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, 3, internalAnnotationsRegexString);
    expect(data.line).to.equal("  liveExample;");
    expect(data.index).to.equal(4);
  });
  it('#2 if var has two annotations should get the real var', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file2.split("\n");
    var data = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, 3, internalAnnotationsRegexString);
    expect(data.line).to.equal("  liveExample;");
    expect(data.index).to.equal(5);
  });

  it('#3 if var has several annotations should get the real var', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file3.split("\n");
    var data = AnnotationHelper.getVarOrFunctionLineOfAnnotationInThisIndexLine(lines, 3, internalAnnotationsRegexString);
    expect(data.line).to.equal("  template;");
    expect(data.index).to.equal(6);
  });
});
