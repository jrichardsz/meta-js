var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var AnnotationHelper = require('../../../../../main/org/metajs/core/AnnotationHelper.js');

var file1 =
`
@RouteHandler(entrypoint = "true")
function EntrypointAction() {

  @Autowire(name="example")
  this.foo;

}

module.exports = EntrypointAction;


`;

describe.only('AnnotationHelper: getExportedModuleName', function() {
  it('should get the module exported name', function() {
    var exportedModuleName = AnnotationHelper.getExportedModuleName(file1);    
    expect(exportedModuleName).to.equal("EntrypointAction");
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
