const include = require('nodejs-require-enhancer');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AnnotationHelper = include('org/metajs/core/AnnotationHelper.js');

describe('AnnotationHelper: getAnnotationMetadataFromRawAnnotationLine', function() {
  it('one argument', function() {
    var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine('  //@Autowire(name="util")');
    assert(annotationMetadata);
    expect(annotationMetadata.name).to.equal("Autowire");
    expect(annotationMetadata.arguments.name).to.equal("util");
  });
  it('one argument with spaces', function() {
    var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine('  //@Autowire(name = "util")');
    assert(annotationMetadata);
    expect(annotationMetadata.name).to.equal("Autowire");
    expect(annotationMetadata.arguments.name).to.equal("util");
  });
  it('two arguments', function() {
    var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine('  //@Render(name="util",location="src")');
    assert(annotationMetadata);
    expect(annotationMetadata.name).to.equal("Render");
    expect(annotationMetadata.arguments.name).to.equal("util");
    expect(annotationMetadata.arguments.location).to.equal("src");
  });
  it('several arguments with allowed special chars', function() {
    var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine('  //@ActionListener(name="util_",location="src/dist",script="ja_v-a")');
    assert(annotationMetadata);
    expect(annotationMetadata.name).to.equal("ActionListener");
    expect(annotationMetadata.arguments.name).to.equal("util_");
    expect(annotationMetadata.arguments.location).to.equal("src/dist");
    expect(annotationMetadata.arguments.script).to.equal("ja_v-a");
  });

  it('two arguments', function() {
    var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine('  //@DomElement( name="util" , location="src" )');
    assert(annotationMetadata);
    expect(annotationMetadata.name).to.equal("DomElement");
    expect(annotationMetadata.arguments.name).to.equal("util");
    expect(annotationMetadata.arguments.location).to.equal("src");
  });

  it('one argument with numbers in value', function() {
    var annotationMetadata = AnnotationHelper.getAnnotationMetadataFromRawAnnotationLine('@ActionListener(tagId="clickMeButton2", type="onclick")');
    assert(annotationMetadata);
    expect(annotationMetadata.name).to.equal("ActionListener");
    expect(annotationMetadata.arguments.tagId).to.equal("clickMeButton2");
    expect(annotationMetadata.arguments.type).to.equal("onclick");
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
