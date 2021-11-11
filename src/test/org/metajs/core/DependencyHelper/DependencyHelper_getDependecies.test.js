var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var path = require("path");
var DependencyHelper = require('../../../../../main/org/metajs/core/DependencyHelper.js');
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

describe('DependencyHelper: getDependecies', function() {
  it('empty action', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test1/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");
  });

  it('action with two variables', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test2/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);
    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");

    assert(dependencies[0].variables.helloWorldPage)
    expect(dependencies[0].variables.helloWorldPage.length).to.equal(1);
    expect(dependencies[0].variables.helloWorldPage[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.helloWorldPage[0].arguments.location).to.equal("pages/helloWorld");
    expect(dependencies[0].variables.acmeApiClient[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.acmeApiClient[0].arguments.name).to.equal("acmeApiClient");

  });

  it('action with one variable and two annotations', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test3/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");

    assert(dependencies[0].variables.helloWorldPage)
    expect(dependencies[0].variables.helloWorldPage.length).to.equal(2);

    expect(dependencies[0].variables.helloWorldPage[0].name).to.equal("Autowire");
    expect(dependencies[0].variables.helloWorldPage[0].arguments.location).to.equal("pages/helloWorld");
    expect(dependencies[0].variables.helloWorldPage[1].name).to.equal("Render");
    expect(dependencies[0].variables.helloWorldPage[1].arguments.required).to.equal("true");
  });


  it('action with one function', function() {

    var headAnnotations = ["DefaultAction"];
    var internalAnnotations = ["Autowire","DomElement","Render","ActionListener"];

    var src = path.resolve(__filename,'..')+'/test4/src';

    var dependencies = DependencyHelper.getDependecies(src, [".js", ".html"], ["src/index.js", "src/index.html"],
    headAnnotations, internalAnnotations);

    assert(dependencies);
    expect(dependencies.length).to.equal(1);
    expect(dependencies[0].meta.name).to.equal("DefaultAction");
    expect(dependencies[0].meta.arguments.name).to.equal("helloWorldAction");
    expect(dependencies[0].meta.arguments.entrypoint).to.equal("true");
    expect(dependencies[0].meta.arguments.route).to.equal("hello");

    assert(dependencies[0].functions.clickOnSomeHtmlElement)
    expect(dependencies[0].functions.clickOnSomeHtmlElement.length).to.equal(1);
    expect(dependencies[0].functions.clickOnSomeHtmlElement[0].name).to.equal("ActionListener");
    expect(dependencies[0].functions.clickOnSomeHtmlElement[0].arguments.htmlId).to.equal("resetButton");
    expect(dependencies[0].functions.clickOnSomeHtmlElement[0].arguments.typeFunction).to.equal("onclick");

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
