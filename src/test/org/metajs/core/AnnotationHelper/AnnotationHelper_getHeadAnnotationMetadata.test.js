import { expect, assert } from 'chai';
import AnnotationHelper  from '../../../../../main/org/metajs/core/AnnotationHelper.js';

var file1 =
`
[DefaultAction(name="acmeAction")]
export class AcmeAction() {
  var $ = this;

  [Autowire]
  this.liveExample;

  function dummy(){};`;

var file2 =
`
[Dummy(name="name")]
export class AcmeAction() {

  [Autowire]
  this.liveExample;

  function dummy(){};`;

//TODO: add extra validation to ensure that these head anottations
// are in the top of the file
describe('AnnotationHelper: getHeadAnnotationMetadata', function() {
  var headAnnotations = ["DefaultAction"]
  var stringRegex = AnnotationHelper.createRegexFromAnnotations(headAnnotations);

  it('must have [DefaultAction] annotation', function() {
    var haveHeadAnnotation = AnnotationHelper.getHeadAnnotationMetadata(file1, stringRegex);
    assert(haveHeadAnnotation);
    expect(haveHeadAnnotation.name).to.equal("DefaultAction");
    expect(haveHeadAnnotation.arguments.name).to.equal("acmeAction");
  });
  it('has not any known annotation', function() {
    var haveHeadAnnotation = AnnotationHelper.getHeadAnnotationMetadata(file2, stringRegex);
    assert(!haveHeadAnnotation);
  });

});
