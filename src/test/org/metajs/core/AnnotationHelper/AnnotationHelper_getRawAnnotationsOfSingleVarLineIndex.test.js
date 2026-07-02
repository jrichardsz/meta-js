import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

var file1 =
`export class ClickCounterAction() {
  var _this = this;

  [Autowire(name="name")]
  catalog;

  function dummy(){};`;

var file2 =
`export class ClickCounterAction() {
  var _self = this;

  [Autowire(name="name")]
  [Render(name="name")]
  liveExample;

  function dummy(){};`;

var file3 =
`export class ClickCounterAction() {
  var $ = this;

  [Autowire(name="name")]
  [Render(name="name")]
  [ActionListener(name="name")]
  template;

  function dummy(){};`;

var file4 =
`export class ClickCounterAction() {
  var _this = this;

  [Autowire]
  liveExample;

  function dummy(){};`;

describe('AnnotationHelper: getRawAnnotationsOfSingleVarLineIndex', function() {
  it('var has one annotation', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file1.split("\n");
    var foundRawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(lines, 4, internalAnnotationsRegexString);
    console.log("foundRawAnnotations", JSON.stringify(foundRawAnnotations, null, 4))
    assert(foundRawAnnotations);
    expect(foundRawAnnotations.length).to.equal(1);
    expect(foundRawAnnotations[0]).to.equal('  [Autowire(name="name")]');
  });
  it('var has two annotations', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file2.split("\n");
    var foundRawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(lines, 5, internalAnnotationsRegexString);
    assert(foundRawAnnotations);
    expect(foundRawAnnotations.length).to.equal(2);
    expect(foundRawAnnotations[0]).to.equal('  [Render(name="name")]');
    expect(foundRawAnnotations[1]).to.equal('  [Autowire(name="name")]');
  });
  it('var has three annotations', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file3.split("\n");
    var foundRawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(lines, 6, internalAnnotationsRegexString);
    assert(foundRawAnnotations);
    expect(foundRawAnnotations.length).to.equal(3);
    expect(foundRawAnnotations[0]).to.equal('  [ActionListener(name="name")]');
    expect(foundRawAnnotations[1]).to.equal('  [Render(name="name")]');
    expect(foundRawAnnotations[2]).to.equal('  [Autowire(name="name")]');
  });
  it('var has one empty annotation', function() {
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"]
    var internalAnnotationsRegexString = AnnotationHelper.createRegexFromAnnotations(internalAnnotations);
    var lines = file4.split("\n");
    var foundRawAnnotations = AnnotationHelper.getRawAnnotationsOfSingleVarLineIndex(lines, 4, internalAnnotationsRegexString);
    assert(foundRawAnnotations);
    expect(foundRawAnnotations.length).to.equal(1);
    expect(foundRawAnnotations[0]).to.equal('  [Autowire]');
  });
});
